import { defineStore } from 'pinia';
import { Character, MessageContentAst } from '../types/ChatContent';
import { textToAst } from '../utils/ChatContentCompiler';

export const useAronaTalkContentsStore = defineStore({
  id: 'aronaTalkContents',
  state: () => {
    return {
      title: 'AronaTalk',
      // contents: [] as ChatContentAst[],
      contents: [] as Array<MessageContentAst[]>,
      characters: [] as Character[],
      currentCharacter: {} as Character,
      currentInput: '' as string,
    };
  },
  persist: true,
  getters: {
    getCurrentInput: state => state.currentInput,
  },
  actions: {
    setCurrentInput(input: string) {
      this.currentInput = input;
    },
    sendCurrentInputToStore() {
      const currentInput = this.currentInput;
      if (0 === currentInput.length) {
        return;
      }
      const messageContentAst = textToAst(this.currentInput);
      this.contents.push([...messageContentAst]);
      this.currentInput = '';
    },
  },
});
