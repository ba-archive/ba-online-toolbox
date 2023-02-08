<template>
  <div
    class="sticker-container"
    v-show="showStickerPicker"
    :style="{
      left: `${stickerButtonLeft}px`,
      transform: `translateY(calc(-50% - ${stickerContainerOffset}px))`,
    }"
  >
    <img
      class="sticker"
      v-for="sticker in stickerList"
      :src="getStickerUrl(sticker.filename)"
      :key="sticker.filename"
      :alt="sticker.filename"
      @click="handleStickerSelect(sticker.filename)"
    />
  </div>

  <div
    class="button-container"
    ref="stickerButtonPositionElement"
    :style="{
      paddingLeft: props.paddingLeft,
      paddingRight: props.paddingRight,
    }"
    @click="handleStickerButtonClick"
  >
    <svg
      class="sticker-button"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xml:space="preserve"
    >
      <!-- eslint-disable max-len -->
      <path
        d="M437,75C388.7,26.6,324.4,0,256,0S123.3,26.6,75,75C26.6,123.3,0,187.6,0,256s26.6,132.7,75,181c48.4,48.4,112.6,75,181,75
	s132.7-26.6,181-75c48.4-48.4,75-112.6,75-181S485.4,123.3,437,75z M256,472c-119.1,0-216-96.9-216-216S136.9,40,256,40
	s216,96.9,216,216S375.1,472,256,472z"
      />
      <path
        d="M369,285.8c-0.1,0.2-7.3,21.6-25,42.4c-22.6,26.4-51.3,39.8-85.6,39.8c-34.5,0-64.2-13.6-88.3-40.3
	c-18.9-21-27.3-42.5-27.3-42.7l-37.5,14c0.4,1.1,10.5,27.8,34,54.3C171,389.1,212.2,408,258.4,408c46.4,0,86.9-19.1,117.1-55.2
	c22.3-26.7,31.2-53.5,31.5-54.7L369,285.8z"
      />
      <!-- eslint-disable max-len -->
      <circle cx="168" cy="180.1" r="32" />
      <circle cx="344" cy="180.1" r="32" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import { Sticker } from '../../types/Sticker';
import { useElementBounding } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    paddingLeft?: string;
    paddingRight?: string;
  }>(),
  {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  }
);

const stickerButtonPositionElement = ref<HTMLElement>();

const { left: stickerButtonLeft, height: stickerButtonHeight } =
  useElementBounding(stickerButtonPositionElement);

const stickerContainerOffset = computed(() => stickerButtonHeight.value + 8);

const showStickerPicker = ref(false);
function handleStickerButtonClick() {
  showStickerPicker.value = !showStickerPicker.value;
}

const stickerList = ref<Sticker[]>([]);

axios
  .get('/image/arona_talk/stickers/sticker_list.json')
  .then(response => {
    stickerList.value = response.data;
  })
  .catch(error => {
    console.error(error);
  });

function getStickerUrl(stickerName: string) {
  return `/image/arona_talk/stickers/${stickerName}`;
}

function handleStickerSelect(stickerName: string) {
  console.log(stickerName);
}
</script>

<style scoped lang="scss">
.button-container {
  display: flex;
  flex: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.sticker-button {
  fill: var(--color-text-main);
  width: 1.5rem;
  height: 1.5rem;
}

//noinspection CssOverwrittenProperties
.sticker-container {
  position: fixed;
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.12));
  border-radius: 4px;
  background-color: var(--color-sticker-panel);
  padding: 0.5rem;
  max-width: 80vw;
  max-width: 80dvw;
  max-height: 50vh;
  max-height: 50dvh;
  overflow-y: auto;

  .sticker {
    width: 4rem;
    height: 4rem;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0.5rem;
    transform: translateY(100%);
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: var(--color-sticker-panel) transparent transparent transparent;
    width: 0;
    height: 0;
    content: '';
  }
}
</style>
