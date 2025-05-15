import { UserDto } from "@/types/types";

export type Action =
  | {
      type: "SET_USER";
      payload: UserDto | null;
    }
  | { type: "SET_STEP"; payload: number }
  | {
      type: "USER_ADD";
      payload: UserDto;
    }
  | {
      type: "USER_RESET";
      payload: null;
    }
  | {
      type: "MODAL_SET";
      data: {
        open: boolean;
        type: "login" | "signup" | "payment" | "review" | "forgotPassword";
      };
    }
  | { type: "SET_USER_ID"; payload: string }
  | { type: "SET_PAYMENT_STATUS"; payload: string };

export const USER_ADD = "USER_ADD";
export const USER_RESET = "USER_RESET";
export const MODAL_SET = "MODAL_SET";
export const SET_USER = "SET_USER";
export const SET_USER_ID = "SET_USER_ID";
export const SET_STEP = "SET_STEP";
