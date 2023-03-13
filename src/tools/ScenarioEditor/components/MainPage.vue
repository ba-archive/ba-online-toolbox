<template>
  <div id="main-page">
    <div id="middle">
      <index-page id="idx"></index-page>
      <opt-page id="opt"></opt-page>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>
<script setup lang="ts">
import { useScenarioStore } from '../store/scenarioEditorStore';
import Footer from './Footer.vue';
import IndexPage from './IndexPage.vue';
import OptPage from './OperatorPage.vue';

const mainStore = useScenarioStore();
</script>
<style>
body {
  overflow: hidden;
}
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  user-select: none;
}
#idx {
  display: flex;
  position: relative;
  margin: 16px;
  border-radius: 1em;
  background-color: #eee;
  width: 100%;
  max-height: 82.5vh;
}
#opt {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 16px;
  background-color: #eee;
  width: 100%;
  height: 82.5vh;
}
</style>
