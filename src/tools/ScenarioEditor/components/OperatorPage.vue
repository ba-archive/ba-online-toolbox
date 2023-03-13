<template>
  <div id="opt">
    <Player></Player>
    <Translation></Translation>
  </div>
</template>
<script setup lang="ts">
import Player from './Player.vue';
import Translation from './Translation.vue';
</script>
<style>
#player {
  margin: 16px;
  width: 100%;
  height: 100%;
}
#translation {
  border-radius: 1em;
  background-color: white;
  width: 100%;
  height: 100%;
}
#opt > * > * {
  margin-bottom: 16px;
}
</style>
