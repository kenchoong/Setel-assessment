import * as cdk from "@aws-cdk/core";
import { resolve } from "path";
import { Table, AttributeType, BillingMode } from "@aws-cdk/aws-dynamodb";
import { Function, Code, Runtime, LayerVersion } from "@aws-cdk/aws-lambda";
import { Topic } from "@aws-cdk/aws-sns";
import { LambdaSubscription } from "@aws-cdk/aws-sns-subscriptions";
import * as apigateway from "@aws-cdk/aws-apigateway";
import { PolicyStatement, Effect, Policy } from "@aws-cdk/aws-iam";
import { SERVFAIL } from "dns";

export class ApiConstruct extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    // DB
    const table = new Table(this, "DynamoDbTable", {
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // HERE DONT DO IT IN PRODUCTION
    });

    // Layer
    const lambdaLayer = new LayerVersion(this, "HandlerLayer", {
      code: Code.fromAsset(resolve(__dirname, "../lambda/layer")),
      compatibleRuntimes: [
        Runtime.NODEJS_12_X,
        Runtime.NODEJS_10_X,
        Runtime.NODEJS_14_X,
      ],
      description: "Api Handler Dependencies",
    });

    // SNS stuff
    let fn = new Function(this, "SubscribeOrderCreatedFunction", {
      code: Code.fromAsset(resolve(__dirname, "../lambda/sns-sub/dist"), {
        exclude: ["node_modules"],
      }),
      handler: "index.handler",
      timeout: cdk.Duration.seconds(30),
      runtime: Runtime.NODEJS_14_X,
      layers: [lambdaLayer],
      environment: {
        //NODE_PATH: "$NODE_PATH:/opt",
        tableName: table.tableName,
      },
    });

    const topic = new Topic(this, "SubscribeOrderCreatedTopic", {
      displayName: "Order is created, publish via this topic",
    });

    topic.addSubscription(new LambdaSubscription(fn));

    // Order Function
    const OrderHandler = new Function(this, "OrderHandler", {
      code: Code.fromAsset(resolve(__dirname, "../lambda/order/dist"), {
        exclude: ["node_modules"],
      }),
      handler: "index.handler",
      runtime: Runtime.NODEJS_14_X,
      layers: [lambdaLayer],
      environment: {
        //NODE_PATH: "$NODE_PATH:/opt",
        tableName: table.tableName,
        topicArn: topic.topicArn,
      },
      timeout: cdk.Duration.seconds(30),
    });
    table.grantReadWriteData(OrderHandler);

    const permissionToTriggerTopic = new PolicyStatement({
      sid: "LambdaTriggerSnsPolicy",
      actions: ["sns:Publish"],
      resources: [topic.topicArn],
      effect: Effect.ALLOW,
    });

    OrderHandler.role?.attachInlinePolicy(
      new Policy(this, "TopicPolicy", {
        statements: [permissionToTriggerTopic],
      })
    );

    // Payment Function
    const PaymentHandler = new Function(this, "PaymentHandler", {
      code: Code.fromAsset(resolve(__dirname, "../lambda/payment/dist"), {
        exclude: ["node_modules"],
      }),
      handler: "index.handler",
      timeout: cdk.Duration.seconds(30),
      runtime: Runtime.NODEJS_14_X,
      layers: [lambdaLayer],
      environment: {
        //NODE_PATH: "$NODE_PATH:/opt",
        tableName: table.tableName,
      },
    });
    table.grantReadWriteData(PaymentHandler);

    // API gateway, need to add 2 resource, Order endpoint and Payment endpoint
    // Order have 3 method, GET, POST, PUT, Get by ID

    // Payment add a POST and Get 1st
    const api = new apigateway.LambdaRestApi(this, "SetelApi", {
      handler: OrderHandler,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key, X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin, Access-Control-Allow-Headers",
        ],
        statusCode: 200,
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
        allowCredentials: true,
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      },
    });

    new cdk.CfnOutput(this, "apiUrl", { value: api.url });

    const order = api.root.addResource("orders");
    const orderIntergrate = new apigateway.LambdaIntegration(OrderHandler, {
      proxy: true,
    });

    const proxy = order.addProxy({
      anyMethod: true,
      defaultIntegration: orderIntergrate,
    });

    order.addMethod("POST", orderIntergrate);
    order.addMethod("PUT", orderIntergrate);
    order.addMethod("GET", orderIntergrate);

    // here payment stuff
    const payment = api.root.addResource("payment");

    payment.addMethod(
      "POST",
      new apigateway.LambdaIntegration(PaymentHandler, { proxy: true })
    );
  }
}
