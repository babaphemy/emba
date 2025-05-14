"use client";
import React, { createContext, useReducer } from "react";

import {
  Action,
  MODAL_SET,
  SET_USER,
  SET_USER_ID,
  USER_ADD,
  USER_RESET,
} from "./Action";
import { UserDto } from "@/types/types";

type State = {
  user: UserDto | null;
  userId: string | null;
  step: number;
  isAuthenticated: boolean;

  modal: {
    open: boolean;
    type: "login" | "signup" | "payment" | "review" | "forgotPassword";
  };
};

type Props = {
  children: React.ReactNode;
};

const getuser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("horaceUser");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  return;
};

const initialState: State = {
  user: getuser(),
  userId: null,
  step: 0,
  isAuthenticated: false,
  modal: {
    open: false,
    type: "login",
  },
};

const Appcontext = createContext(initialState);
const AppDpx = createContext<React.Dispatch<Action>>(() => {});
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case USER_ADD:
      return {
        ...state,
        user: action.payload,
      };
    case USER_RESET:
      return {
        ...state,
        user: null,
      };
    case MODAL_SET:
      return {
        ...state,
        modal: {
          open: action.data.open,
          type: action.data.type,
        },
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Appcontext.Provider value={state}>
      <AppDpx.Provider value={dispatch}>{children}</AppDpx.Provider>
    </Appcontext.Provider>
  );
};

export { Appcontext, AppDpx, AppProvider };
