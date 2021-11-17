import * as cdk from "@aws-cdk/core";
import { ApiConstruct } from "./api.construct";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new ApiConstruct(this, "API");
  }
}
