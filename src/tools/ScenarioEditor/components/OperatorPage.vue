<template>
  <div id="opt">
    <player-part></player-part>
    <translation-part></translation-part>
  </div>
</template>
<script setup lang="ts">
import PlayerPart from './Player.vue';
import TranslationPart from './Translation.vue';
</script>
<style>
#player {
  flex: 1;
  margin: 16px;
  width: 100%;
  height: 100%;
}
#translation {
  flex: 1;
  border-radius: 1em;
  background-color: white;
  width: 100%;
  height: 100%;
}
#translation > * {
  margin-bottom: 16px;
}
</style>
