<template>
  <div id="loadFile">
    <div id="collider" @drop="dragHandle" @dragover="dragOver"></div>
  </div>
</template>
<script setup lang="ts">
import { useScenarioStore } from '../store/ScenarioEditorStore';
import { Scenario } from '../types/content';

const mainStore = useScenarioStore();
/**
 * 拖拽文件处理函数, 读取文件名以及内容并解析为Scenario, 并将其存入store
 */
const dragHandle = (event: DragEvent): void => {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (files && files.length > 1) {
    alert('只能上传一个文件');
    return;
  }
  mainStore.setTitle(files![0].name);
  readFile(files![0]).then((data: string) => {
    const parsed = JSON.parse(data) as Scenario;
    mainStore.setScenario(parsed);
    mainStore.loadFile();
  });
};
/**
 * 拖拽文件时阻止默认事件
 */
const dragOver = (e: DragEvent): void => {
  e.preventDefault();
};
const readFile = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      resolve(event.target?.result as string);
    };
    reader.onerror = error => {
      reject(error);
    };
    reader.readAsText(file);
  });
};
</script>
<style>
#loadFile {
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
}
#collider {
  position: absolute;
  flex: 1;
  background-color: #66ccffaa;
  width: 100%;
  height: 100%;
}
#upload {
  /* vector */

  position: absolute;
  top: 18.75%;
  right: 6.25%;
  bottom: 15.62%;
  left: 6.25%;

  /* light/text/--el-text-color-disabled */
  background: #c0c4cc;
}
</style>
