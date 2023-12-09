import axios from "axios";
import axiosInstance from "../api/axios";
import { useState } from "react";
import { useTodo } from "../context/todoContext";
import { TodoState } from "../types/typeList";

interface Fetch {
  isFetching: boolean;
  findAllTodos: () => Promise<void>;
  fetchError: string;
}
type FetchHook = () => Fetch;
const useFetchTodos: FetchHook = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");
  const { dispatch } = useTodo();

  const findAllTodos = async () => {
    try {
      setIsFetching(true);
      const {
        data: { todos },
      } = await axiosInstance.get<TodoState>("/");
      dispatch && dispatch({ type: "SET_TODOS", payload: todos });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const {
            data: { msg },
          } = error.response;
          setFetchError(msg);
        } else if (error.request) {
          setFetchError("Could not connect to server!");
        } else {
          setFetchError(error.message);
        }
      } else {
        setFetchError("Unknown error occured!");
      }
    } finally {
      setIsFetching(false);
    }
  };
  return { isFetching, fetchError, findAllTodos };
};

export default useFetchTodos;
