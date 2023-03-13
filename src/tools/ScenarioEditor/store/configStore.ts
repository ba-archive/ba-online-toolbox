import { defineStore } from 'pinia';
import { Language } from '../types/content';

export const useGlobalConfig = defineStore({
  id: 'globalConfig',
  state: () => ({
    proofread: false,
    selectLine: -1,
    language: 'TextJp' as Language,
    targetLang: 'TextCn' as Language,
  }),
  getters: {
    isProofread: state => state.proofread,
    getSelectLine: state => state.selectLine,
    getLanguage: state => state.language,
    getTargetLang: state => state.targetLang,
  },
  actions: {
    startProofread() {
      this.proofread = true;
    },
    stopProofread() {
      this.proofread = false;
    },
    setProofread(proofread: boolean) {
      this.proofread = proofread;
    },
    setSelectLine(line: number) {
      this.selectLine = line;
    },
    setLanguage(language: Language) {
      this.language = language;
    },
    setTargetLang(targetLang: Language) {
      this.targetLang = targetLang;
    },
    initialize_state() {
      this.proofread = false;
      this.selectLine = -1;
    },
    initialize_config() {
      this.language = 'TextCn';
    },
  },
});
