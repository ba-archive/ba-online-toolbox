<template>
  <div id="translation">
    <div id="reference">
      <n-button secondary type="info" style="margin: 16px"
        >参考文本语言</n-button
      >
      <n-button
        v-for="lang in Object.keys(langHash)"
        :focusable="false"
        @click="config.setLanguage(lang as Language)"
        :class="config.getLanguage == lang ? 'selectedLanguage' : ''"
        >{{ langHash[lang as Language] }}</n-button
      >
      <n-button
        :type="config.isProofread ? 'success' : 'error'"
        @click="config.setProofread(!config.isProofread)"
      >
        校对模式: {{ config.isProofread ? '开' : '关' }}
      </n-button>
      <br />
    </div>
    <div id="referLang">
      <n-input
        type="textarea"
        style="width: 95%; margin-left: 2.5%; height: 80px"
        :value="
          config.getSelectLine != -1
            ? mainStore.getScenario.content[config.getSelectLine][
                config.getLanguage
              ].replaceAll('#n', '[#n]')
            : '请选择一行'
        "
        :placeholder="
          config.getSelectLine != -1
            ? mainStore.getScenario.content[config.getSelectLine][
                config.getLanguage
              ] || '该语言暂无翻译'
            : ''
        "
      ></n-input>
    </div>
    <div id="trans">
      <n-dropdown
        trigger="hover"
        :options="langSelect"
        @select="
          {
            config.setTargetLang($event as Language);
          }
        "
      >
        <n-button secondary type="info">
          目标语言: {{ langHash[config.getTargetLang] }}
        </n-button>
      </n-dropdown>
    </div>
    <div id="ans">
      <n-input
        v-if="true"
        type="textarea"
        :value="
          config.getSelectLine != -1
            ? mainStore.getScenario.content[config.getSelectLine][
                config.getTargetLang
              ].replaceAll('#n', '[#n]')
            : ''
        "
        @input="inputHandle"
        style="width: 55%; margin-left: 2.5%; height: 120px"
      ></n-input>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NButton, NDropdown, NInput } from 'naive-ui';
import { useGlobalConfig } from '../store/configStore';
import { useScenarioStore } from '../store/scenarioEditorStore';
import { ContentLine, Language } from '../types/content';

const config = useGlobalConfig();
const mainStore = useScenarioStore();

const langHash = {
  TextJp: '日语',
  TextEn: '英语',
  TextKr: '韩语',
  TextTh: '泰文',
  TextCn: '简体中文',
  TextTw: '繁体中文',
};

const langSelect = [
  { label: '简体中文', key: 'TextCn' },
  { label: '繁体中文', key: 'TextTw' },
  { label: '日文', key: 'TextJp' },
  { label: '英文', key: 'TextEn' },
  { label: '韩文', key: 'TextKr' },
  { label: '泰文', key: 'TextTh' },
];
const inputHandle = (event: string) => {
  if (config.getSelectLine != -1) {
    const line = mainStore.getScenario.content[config.getSelectLine];
    line[config.getTargetLang] = event.replaceAll('[#n]', '#n');
    mainStore.setContentLine(line as ContentLine, config.getSelectLine);
  }
};
const log = (data: any) => console.log(data);
</script>
<style>
.selectedLanguage {
  background-color: var(--color-arona-blue);
  color: white;
}
#reference > * {
  margin: 8px;
  width: auto;
  min-width: 80px;
}
#reference {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
