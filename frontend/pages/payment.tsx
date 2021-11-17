import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Flex, Text, Button, Spinner } from "@chakra-ui/react";
import {
  PaymentContextInterface,
  usePayment,
} from "../components/hooks/PaymentContext";
import {
  checkOrderStatus,
  updateOrderStatus,
} from "../services/orderDataSource";

import { interval, from, defer, timer, startWith, tap } from "rxjs";
import { takeWhile, takeUntil, map, concatMap, take } from "rxjs/operators";
import { useRouter } from "next/router";

interface paymentProps {}

const PaymentPage: React.FC<paymentProps> = ({}) => {
  const { orderData } = usePayment();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [deliverSecond, setDeliverSecond] = useState(0);
  const [secondRemain, setSecondRemain] = useState(1);
  const [delivered, setDelivered] = useState(false);

  console.log(delivered);

  console.log(orderData?.created.id);
  const arr = ["Confirmed", "Declined"];

  const [status, setStatus] = useState("Initializing");

  const observe = (orderId: string) => {
    const isContinue = (orderStatus: string) => {
      console.log(orderStatus);
      return !arr.includes(orderStatus);
    };

    return defer(() =>
      interval(5 * 1000).pipe(
        startWith(0),
        concatMap(() =>
          from(checkOrderStatus("1234", orderId)).pipe(
            map((response) => response.data)
          )
        ),
        takeWhile((data) => isContinue(data.orderStatus), true),
        takeUntil(timer(60 * 1000))
      )
    );
  };

  const deliver = () => {
    return defer(() =>
      timer(0, 3000).pipe(
        take(4),
        tap((x) => {
          console.log("line 60", x);
          setDeliverSecond(x);
          setSecondRemain(secondRemain - x);
        })
      )
    );
  };

  const subsribe = (orderData: PaymentContextInterface) => {
    const on = observe(orderData.created.id).subscribe((res) => {
      setIsLoading(true);
      setStatus(res.orderStatus);

      if (arr.includes(res.orderStatus)) {
        setIsLoading(false);

        if (res.orderStatus === "Confirmed") {
          const del = deliver().subscribe((x) => {
            console.log(x);
            if (secondRemain - x < 0) {
              console.log("get called");
              setIsLoading(true);
              updateOrderStatus(orderData.created.id, "1234", "Delivered")
                .then((res) => {
                  console.log(res);
                  setIsLoading(false);
                  setDelivered(true);
                  del.unsubscribe();
                })
                .catch((error) => {
                  setIsLoading(false);
                  setDelivered(false);
                  del.unsubscribe();
                });
            }
          });
        }
      }
    });

    return on;
  };

  useEffect(() => {
    if (orderData) {
      subsribe(orderData);
    }
  }, [orderData]);

  if (delivered) {
    return (
      <Layout>
        <Flex mt={8} direction="column">
          <Text>Delivered</Text>
          <Button mt={4} colorScheme="blue" onClick={() => router.push("/")}>
            Back to home
          </Button>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Text>Here to do the payment stuff</Text>
      <>
        <Text m={5}>
          Every 5 seconds, I will call to server to check the Payment status
        </Text>

        <Text>So dont close this page</Text>

        <Flex mt={4}>
          {!arr.includes(status) ? (
            <Flex>
              <Text>Your payment status: </Text>
              <Text ml={4} fontWeight="bold" color="green">
                {" "}
                {status}
              </Text>
            </Flex>
          ) : (
            <Flex direction="column">
              <Flex>
                <Text>Your payment status: </Text>
                <Text
                  align="center"
                  justify="center"
                  ml={4}
                  fontWeight="bold"
                  color={status === "Declined" ? "red" : "blue"}
                >
                  {" "}
                  {status}
                </Text>
              </Flex>

              {status !== "Confirmed" ? (
                <Button
                  mt={4}
                  colorScheme="green"
                  onClick={() => router.push("/")}
                >
                  Back to home page
                </Button>
              ) : (
                <Flex mt={4}>
                  {secondRemain > 0 && (
                    <Text>will delivered in {secondRemain} seconds</Text>
                  )}
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </>
      {isLoading && <Spinner mt={4} />}
    </Layout>
  );
};

export default PaymentPage;
