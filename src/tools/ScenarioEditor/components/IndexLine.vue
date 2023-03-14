<template>
  <n-card
    v-if="line.TextJp != ''"
    style="margin: 16px; width: auto"
    :style="`background-color: ${colorHandle()}`"
  >
    <n-image src="../src/upload.svg"></n-image>
    <n-text>{{ line[config.getLanguage] }}</n-text>
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
      return '#f0a020';
    } else {
      return '#d03050'; // 红色有点刺眼
    }
  } else {
    if (props.index == config.selectLine) {
      return 'grey';
    } else {
      return 'white';
    }
  }
};
</script>
<style>
.selected {
  background-color: grey;
}
</style>
