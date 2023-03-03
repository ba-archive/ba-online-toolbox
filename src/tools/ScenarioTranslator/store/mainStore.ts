import { defineStore } from 'pinia';
import { Scenario, ContentLine, Language } from '../types/content';

export const useMainStore = defineStore({
  id: 'ScenarioTranslation',
  state: () => {
    return {
      language: "TextEn" as Language,
      scenario: {} as Scenario,
      title: '',
    };
  },
  persist: true,
  getters: {
    getScenario: state => state.scenario,
    getTitle: state => state.title,
    getLanguage: state => state.language,
  },
  actions: {
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
