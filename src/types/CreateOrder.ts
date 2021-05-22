/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrder
// ====================================================

export interface CreateOrder_createOrder {
  __typename: "CreateOrderOutput";
  ok: boolean;
  orderId: number | null;
  error: string | null;
}

export interface CreateOrder {
  createOrder: CreateOrder_createOrder;
}

export interface CreateOrderVariables {
  input: CreateOrderInput;
}
