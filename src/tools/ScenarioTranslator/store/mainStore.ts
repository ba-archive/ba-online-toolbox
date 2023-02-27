import { defineStore } from 'pinia';
import { Scenario } from '../types/scenario';

export const useMainStore = defineStore({
  id: 'ScenarioTranslation',
  state: () => {
    return {
      scenario: {} as Scenario[],
      title: '',
    };
  },
  persist: true,
  getters: {
    getScenario: state => state.scenario,
    getTitle: state => state.title,
  },
  actions: {
    setScenario(scenario: Scenario[]) {
      this.scenario = scenario;
    },
    clearAll() {
      this.scenario = {} as Scenario[];
      this.title = '';
    },
    updateScenario(scenario: Scenario, index: number) {
      this.scenario[index] = scenario;
    },
    setTitle(title: string) {
      this.title = title;
    },
  },
});
