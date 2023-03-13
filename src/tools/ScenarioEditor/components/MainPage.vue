<template>
  <n-button @click="mainStore.clearAll">按钮</n-button>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui';
import { useScenarioStore } from '../store/ScenarioEditorStore';

const mainStore = useScenarioStore();
</script>
