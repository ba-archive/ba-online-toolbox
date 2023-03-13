<template>
  <n-card
    v-if="line.TextJp != ''"
    style="margin: 16px; width: auto"
    :class="index == config.selectLine ? 'selected' : ''"
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
</script>
<style>
.selected {
  background-color: grey;
}
</style>
