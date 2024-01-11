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

export const AddWordMutation = gql`
  mutation addWord($word: String!) {
    addWord(word: $word) {
      id
      word
    }
  }
`;
