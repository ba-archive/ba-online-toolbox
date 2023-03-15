<template>
  <n-card
    v-if="line.TextJp != ''"
    style="margin: 16px; width: auto"
    :style="`background-color: ${colorHandle()}`"
  >
    <n-image v-if="false"></n-image>
    <n-text>
      <span v-if="config.isSwitchLanguage & 0b10">{{
        props.line[config.getLanguage] || '暂无参考文本'
      }}</span>
      <br v-if="config.isSwitchLanguage == 3" />
      <span v-if="config.isSwitchLanguage & 0b01">{{
        props.line[config.getTargetLang] || '暂无翻译'
      }}</span>
    </n-text>
  </n-card>
</template>
<script setup lang="ts">
import { NCard, NImage, NText } from 'naive-ui';
import { useGlobalConfig } from '../store/configStore';
import { useScenarioStore } from '../store/scenarioEditorStore';
import { ContentLine } from '../types/content';

const mainStore = useScenarioStore();
const config = useGlobalConfig();
const props = defineProps<{
  line: ContentLine;
  index: number;
}>();

const colorHandle = (): string => {
  if (props.line.Unsure) {
    if (props.index == config.selectLine) {
      return 'orange';
    } else {
      return 'yellow'; // 红色有点刺眼
    }
  } else {
    if (props.index == config.selectLine) {
      if (props.line[config.targetLang] == '') {
        return 'grey';
      } else {
        return 'green';
      }
    } else {
      if (props.line[config.targetLang] == '') {
        return 'white';
      } else {
        return 'lime';
      }
    }
  }
};

const textHandle = () => {
  if (config.isSwitchLanguage == 3) {
    return (
      `<span>${props.line[config.getLanguage]}</span>\n<span>${
        props.line[config.getTargetLang]
      }</span>` || '暂无翻译'
    );
  } else if (config.isSwitchLanguage == 2) {
    return props.line[config.getLanguage] || '暂无翻译';
  } else if (config.isSwitchLanguage == 1) {
    return props.line[config.getTargetLang] || '暂无翻译';
  }
};
</script>
<style>
.selected {
  background-color: grey;
}
</style>
