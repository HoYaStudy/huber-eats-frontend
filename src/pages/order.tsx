import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { FULL_ORDER_FRAGMENT } from "../fragments";
import { useMe } from "../hooks/useMe";
import { EditOrder, EditOrderVariables } from "../types/EditOrder";
import { GetOrder, GetOrderVariables } from "../types/GetOrder";
import { OrderStatus, UserRole } from "../types/globalTypes";
import { OrderUpdates, OrderUpdatesVariables } from "../types/OrderUpdates";

const GET_ORDER = gql`
  query GetOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      order {
        ...FullOrderParts
      }
      error
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription OrderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const EDIT_ORDER = gql`
  mutation EditOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data: userData } = useMe();
  const [EditOrderMutation] =
    useMutation<EditOrder, EditOrderVariables>(EDIT_ORDER);
  const { data, subscribeToMore } = useQuery<GetOrder, GetOrderVariables>(
    GET_ORDER,
    {
      variables: { input: { id: +params.id } },
    }
  );
  const { data: subscriptionData } = useSubscription<
    OrderUpdates,
    OrderUpdatesVariables
  >(ORDER_SUBSCRIPTION, { variables: { input: { id: +params.id } } });
  const onButtonClick = (newStatus: OrderStatus) => {
    EditOrderMutation({
      variables: { input: { id: +params.id, status: newStatus } },
    });
  };

  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: { input: { id: +params.id } },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: {
            subscriptionData: { data: OrderUpdates };
          }
        ) => {
          if (!data) {
            return prev;
          }
          return {
            getOrder: { ...prev.getOrder, order: { ...data.orderUpdates } },
          };
        },
      });
    }
  }, [data]);

  return (
    <div className="mt-32 container flex justify-center">
      <Helmet>
        <title>Order #{params.id} | hUber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm border border-gray-800 flex flex-col justify-center">
        <h4 className="bg-gray-800 w-full py-5 text-white text-center text-xl">
          Order #{params.id}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center ">
          ${data?.getOrder.order?.total}
        </h5>
        <div className="p-5 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700">
            Prepared By:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="border-t pt-5 border-gray-700 ">
            Deliver To:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>{" "}
          <div className="border-t border-b py-5 border-gray-700">
            Driver:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.driver?.email || "Not yet."}
            </span>
          </div>
          {userData?.whoami.role === "Client" && (
            <span className="mt-5 mb-3 text-center text-2xl text-lime-600">
              Status: {data?.getOrder.order?.status}
            </span>
          )}
          {userData?.whoami.role === UserRole.Owner && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Pending && (
                <button
                  onClick={() => onButtonClick(OrderStatus.Cooking)}
                  className="btn"
                >
                  Accept Order
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.Cooking && (
                <button
                  onClick={() => onButtonClick(OrderStatus.Cooked)}
                  className="btn"
                >
                  Order Cooked
                </button>
              )}
              {data?.getOrder.order?.status !== OrderStatus.Cooking &&
                data?.getOrder.order?.status !== OrderStatus.Pending && (
                  <span className="mt-5 mb-3 text-center text-2xl text-lime-600">
                    Status: {data?.getOrder.order?.status}
                  </span>
                )}
            </>
          )}
          {userData?.whoami.role === UserRole.Delivery && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Cooked && (
                <button
                  onClick={() => onButtonClick(OrderStatus.PickedUp)}
                  className="btn"
                >
                  Picked Up
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.PickedUp && (
                <button
                  onClick={() => onButtonClick(OrderStatus.Delivered)}
                  className="btn"
                >
                  Order Delivered
                </button>
              )}
            </>
          )}
          {data?.getOrder.order?.status === OrderStatus.Delivered && (
            <span className="mt-5 mb-3 text-center text-2xl text-lime-600">
              Thank you for using hUber Eats
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
