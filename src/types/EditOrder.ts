/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditOrder
// ====================================================

export interface EditOrder_editOrder {
  __typename: "EditOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface EditOrder {
  editOrder: EditOrder_editOrder;
}

export interface EditOrderVariables {
  input: EditOrderInput;
}
