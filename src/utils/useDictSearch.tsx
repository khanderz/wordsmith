import * as React from 'react';

interface DictSearchProps {
    word: string;
}

export const useDictSearch = (props: DictSearchProps) => {
    const fetchDict = async (word: string) => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        return data;
    }

    return {
        fetchDict,
    }
}