import { produce } from 'immer';

import type { WordType } from '@/types';

let wordsList: WordType[] = [];

const addWord = (word: WordType) => {
  wordsList = produce(wordsList, (draftState) => {
    draftState.push(word);
  });
};

export { addWord };
