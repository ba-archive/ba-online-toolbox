import { defineStore } from 'pinia';
import { Scenario } from '../types/content';

export const useScenarioStore = defineStore({
  id: 'scenarioStore',
  state: () => {
    return {
      fileLoad: false,
      scenario: {} as Scenario,
      title: '',
    };
  },
  persist: true,
  getters: {
    isLoadFile: state => state.fileLoad,
    getScenario: state => state.scenario,
    getTitle: state => state.title,
  },
  actions: {
    loadFile() {
      this.fileLoad = true;
    },
    unLoadFile() {
      this.fileLoad = false;
    },
    setScenario(scenario: Scenario) {
      this.scenario = scenario;
      console.log('SetScenario', scenario);
    },
    setTitle(title: string) {
      this.title = title;
    },
    clearAll() {
      this.scenario = {} as Scenario;
      this.title = '';
      this.fileLoad = false;
    },
  },
});
