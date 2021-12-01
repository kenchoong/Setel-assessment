## Break down the whole OrderController to Domain Driven Design (DDD)

Some experiment. Explain the whole flow, explain it in my own word, only for demonstration. Now already using Lambda, so dont see the point to using this. lol

### Folder structure is like this:

- API
- Database
- Domain
- Queries

Each folder will be 1 module, and that module will handle different things, the folder name is self-explanatory.

### API

Characteristic

- Inside this module will contain all the endpoint for the app.
- Right now it just have 1 name `Order` for `/order`
- For real world use case it can contain `Payment`, `Marketing`, `Sales`, `Product`, `ProductCategories` and so on.
- Each endpont will have the respectively module
- Inside each module will defined DTO(Data Transfer Object) which is the data we will recieve from the request, into bunch of different files.
- At the end will gel it up in `ApiModule` which is `nestjs` module class.
- So we can use it inside `app.module.ts` which will the main module for the whole the app.

### Database

- Just defined the connection with Dynamodb, and export it as a module

### Domain

This is the most important module. This act like a `connector` between `View` (API module AKA entry point for user to interact with our app) to our Database where we store data.

Same like `API`, will separate it each folder for each domain which means all the related function regarding to an `Entity`, example `Order`, `Payment`, `Product` and so on, each on do their own stuff.

`IOrderRepo` : will define a inteface for all `operation` we need to do, this will provide a `window` for `API` to interact with. Inside it will have `Create`, `Update`, `Check`, `Get`, `GetList` etc.

What will happen when function inside `IOrderRepo` get called? For instance `Create`

This will call to `CreateOrder.ts` which contain a function in `Queries` folder which will interact with our Database. Same with `Update`, `Check`, `Get`, `GetList` inside `IOrderRepo`.

> The reason to do this is: **Single Responsibility Principle**, AKA 1 file, 1 class, do 1 thing.

In this case:

- `IOrderRepo.ts` only define all the interface method to other class to interact with.
- `CreateOrder.ts` only call to `Queries` to interact with database (will come to this later)

Domain module will contain all the `different` domain, combined all together, it become `DomainModule` will can be use by any class needed.

### Queries

This is where I interact with data model, and actual query to DynamoDB.

- `OrderEntity`: Defined the schema what `field` and data type of an Order, like it `id`, `productName` and so on.
- `OrderRepoProvider.ts`: Nestjs stuff, need to use inside `Module`
- `Repo.ts`: This class will implement `IOrderRepo` above, which means all the interface method will defined here. Then inside each method will interact with DynamoDB.

Therefore the whole picture will look like this:

> API controller -> UpdateOrder/CreateOrder/GetOrder -> IOrderRepo interface -> OrderRepo.ts(Queries) -> Here will interact with DynamoDB and return data.

Alright, when `Order`, `Payment` all done, will gel it up inside `QueriesModel.ts`.

### End product

When we break it all down, then inside API controller, my code will be in 1 line which is:

```ts
export class OrderController {
  constructor(
    //....all other stuff

    // here inject all the stuff
    private createOrder1: CreateOrder,
    private updateOrder: UpdateOrder,
    private getAllOrder: GetOrderList,
    private getOneOrder: GetOrder,
    private checkOrderStatus: CheckOrderStatus,
  ) {}

  // FETCH Order details using the OrderId
  @Get('/:userId/:orderId')
  async findOrderByOrderId(
    @Param('orderId') orderId: string,
    @Param('userId') userId: string,
  ) {

    //then inside here will be 1 line.
    const res = await this.getOneOrder.Get(userId, orderId);

    return {
      //Here I return back the response
    };
  }

```

### Advantages

Decouple the implementation

> await this.getOneOrder.Get(userId, orderId);

In this line, I no need to care how `Get` will implement the stuff. Whether next time I want to use dynamoDb or not also never mind. What I only need to know is, the `Get` function exists, it need to get 2 parameters, then done.

### Problems right now.

Right now I havent complete this, because I use DynamoDB single table design. I want to use `@nestjs-dynamoose` library. But all the example provided is without `PK, SK` only `hashkey` but no `rangeKey`. Therefore I havent figure it out.

Tried to use `TypeOrm` as well, seems like it didnt support Dynamodb yet. Therefore I stuck as well.
