import { useMutation, useQuery } from "@apollo/client";

import { insertWordMutation, GetWordListQuery, GetWordsQuery } from "./schema";
import { Definition, WordInsertInput } from "../types";

export const useGetWordsQuery = () =>
  useQuery(GetWordsQuery, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const useGetWordsListQuery = () =>
  useQuery(GetWordListQuery, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const useInsertWordMutation = (wordOject: WordInsertInput) =>
  useMutation(insertWordMutation, {
    variables: { wordOject },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
