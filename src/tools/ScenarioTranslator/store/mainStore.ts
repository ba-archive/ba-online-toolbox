import { defineStore } from 'pinia';
import { ContentLine, Language, Scenario } from '../types/content';

export const useMainStore = defineStore({
  id: 'ScenarioTranslation',
  state: () => {
    return {
      language: 'TextEn' as Language,
      scenario: {} as Scenario,
      title: '',
      original: true,
    };
  },
  persist: true,
  getters: {
    getScenario: state => state.scenario,
    getTitle: state => state.title,
    getLanguage: state => state.language,
  },
  actions: {
    SwitchOriginal(flg: boolean | undefined = undefined) {
      if (flg !== undefined) this.original = flg;
      else this.original = !this.original;
    },
    setScenario(scenario: Scenario) {
      this.scenario = scenario;
    },
    clearAll() {
      this.scenario = {} as Scenario;
      this.title = '';
    },
    updateScenario(scenario: ContentLine, index: number) {
      this.scenario.content[index] = scenario;
    },
    setTitle(title: string) {
      this.title = title;
    },
    setLanguage(language: Language) {
      this.language = language;
    },
  },
});
