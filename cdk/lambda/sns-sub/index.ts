import axios from "axios";

export const handler = async (event: any = {}): Promise<any> => {
  const message = event["Records"][0]["Sns"]["Message"];
  const snsPayload = JSON.parse(message);

  console.log(message);
  console.log(snsPayload);

  const endpoint = snsPayload.url + "/payment";
  const productId = snsPayload.productId;
  const orderId = snsPayload.orderId;
  const userId = snsPayload.userId;

  const param = {
    orderId: orderId,
    userId: userId,
    productId: productId,
  };
  const response = await axios.post(endpoint, param);
  console.log("response in 21", response);

  return response.data.ok;
};
