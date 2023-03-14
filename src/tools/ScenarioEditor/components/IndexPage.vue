<template>
  <n-scrollbar trigger="hover">
    <index-line
      :line="line"
      :index="index"
      @click="
        () => {
          config.setSelectLine(index);
        }
      "
      v-for="(line, index) in mainStore.getScenario.content"
    ></index-line>
  </n-scrollbar>
</template>
<script setup lang="ts">
import { NScrollbar } from 'naive-ui';
import { useGlobalConfig } from '../store/configStore';
import { useScenarioStore } from '../store/scenarioEditorStore';
import IndexLine from './IndexLine.vue';

const mainStore = useScenarioStore();
const config = useGlobalConfig();
const log = (data: any) => console.log(data);
</script>
<style></style>
