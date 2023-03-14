<template>
  <div id="player">
    <ba-story-player
      :story="mainStore.getScenario.content"
      :language="'Cn'"
      :width="800"
      :height="600"
      :user-name="mainStore.getScenario.translator"
      :story-summary="{ chapterName: '', summary: '' }"
      data-url="https://yuuka.cdn.diyigemt.com/image/ba-all-data"
      :ref="undefined"
    >
    </ba-story-player>
  </div>
</template>
<script setup lang="ts">
import BaStoryPlayer from 'ba-story-player';
import { PlayerProps } from 'ba-story-player';
import { useGlobalConfig } from '../store/configStore';
import { useScenarioStore } from '../store/scenarioEditorStore';

const mainStore = useScenarioStore();
const config = useGlobalConfig();
</script>
