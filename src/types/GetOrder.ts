/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOrder
// ====================================================

export interface GetOrder_getOrder_order_customer {
  __typename: "User";
  email: string;
}

export interface GetOrder_getOrder_order_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface GetOrder_getOrder_order_driver {
  __typename: "User";
  email: string;
}

export interface GetOrder_getOrder_order {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  customer: GetOrder_getOrder_order_customer | null;
  restaurant: GetOrder_getOrder_order_restaurant | null;
  driver: GetOrder_getOrder_order_driver | null;
}

export interface GetOrder_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  order: GetOrder_getOrder_order | null;
  error: string | null;
}

export interface GetOrder {
  getOrder: GetOrder_getOrder;
}

export interface GetOrderVariables {
  input: GetOrderInput;
}
