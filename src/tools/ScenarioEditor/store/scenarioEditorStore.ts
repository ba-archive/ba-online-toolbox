import { defineStore } from 'pinia';
import { ContentLine, Scenario } from '../types/content';

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
      this.loadFile();
    },
    setTranslator(translator: string) {
      this.scenario.translator = translator;
    },
    setContentLine(content: ContentLine, line: number) {
      this.scenario.content[line] = content;
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

export type Language =
  | 'TextCn'
  | 'TextTw'
  | 'TextJp'
  | 'TextEn'
  | 'TextKr'
  | 'TextTh';
