import { gql } from "@apollo/client";

export const GetWordsQuery = gql`
  query getWords {
    words {
      id
      word
    }
  }
`;

export const GetWordListQuery = gql`
  query getWordList {
    wordLists {
      id
      title
      words
    }
  }
`;

export const insertWordMutation = gql`
  mutation insertWord($word_object: WordInsertInput!) {
    addWord(word_object: $word_object) {
      id
      word
    }
  }
`;
