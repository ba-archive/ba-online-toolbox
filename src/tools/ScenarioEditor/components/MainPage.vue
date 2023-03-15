<template>
  <div id="main-page">
    <index-page id="idx"></index-page>
    <opt-page id="opt"></opt-page>
  </div>
  <footer-div id="footer"></footer-div>
</template>
<script setup lang="ts">
import { useScenarioStore } from '../store/scenarioEditorStore';
import FooterDiv from './Footer.vue';
import IndexPage from './IndexPage.vue';
import OptPage from './OperatorPage.vue';

const mainStore = useScenarioStore();
</script>
<style>
#footer {
  width: 100%;
}
#middle {
  display: flex;
  flex: 8;
  width: 100%;
}
#main-page {
  display: flex;
  position: relative;
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
  user-select: none;
}
#idx {
  display: flex;
  position: relative;
  flex: 1;
  margin: 16px;
  border-radius: 1rem;
  background-color: #eee;
  width: 50%;
  max-height: 100vh;
}
#opt {
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 16px;
  background-color: #eee;
  width: 50%;
  height: 100vh;
}
</style>
