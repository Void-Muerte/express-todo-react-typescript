import { ReactNode, Dispatch } from "react";
import { Action, TodoState } from "../types/typeList";
import { MType } from "../enums/enumList";

export interface TodoProps {
    state: TodoState;
    dispatch: Dispatch<Action>;
}
  
export interface TodoProviderProps {
    children: ReactNode;
}

export interface Message {
    type: MType,
    msg:string
}