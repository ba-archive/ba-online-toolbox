import { defineStore } from 'pinia';
import { Language } from '../types/content';

export const useGlobalConfig = defineStore({
  id: 'globalConfig',
  state: () => ({
    proofread: false,
    selectLine: -1,
    language: 'TextJp' as Language,
    targetLang: 'TextCn' as Language,
    tmpMachineTranslate: '',
    switchLanguage: 0b01,
  }),
  getters: {
    isProofread: state => state.proofread,
    getSelectLine: state => state.selectLine,
    getLanguage: state => state.language,
    getTargetLang: state => state.targetLang,
    getTmpMachineTranslate: state => state.tmpMachineTranslate,
    isSwitchLanguage: state => state.switchLanguage,
  },
  actions: {
    startProofread() {
      this.proofread = true;
    },
    stopProofread() {
      this.proofread = false;
    },
    changeLanguage() {
      if (this.switchLanguage == 0b11) {
        this.switchLanguage = 0b01;
      } else {
        this.switchLanguage++;
      }
    },
    setProofread(proofread: boolean) {
      this.proofread = proofread;
    },
    setSelectLine(line: number) {
      this.selectLine = line;
      this.tmpMachineTranslate = '';
    },
    setTmpMachineTranslate(text: string) {
      this.tmpMachineTranslate = text;
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
      this.tmpMachineTranslate = '';
    },
    initialize_config() {
      this.language = 'TextCn';
      this.targetLang = 'TextJp';
    },
  },
});
