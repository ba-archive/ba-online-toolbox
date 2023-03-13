<template>
  <div id="loadFile">
    <div class="collider" @drop="dragHandle" @dragover="dragOver"></div>
    <div id="upload">
      <img src="../src/upload.svg" alt="上传图标" id="uploadIMG" />
      <div class="collider" @drop="dragHandle" @dragover="dragOver"></div>
      <div id="tips" style="font-size: 16px">
        将文件拖拽至此或<a
          @click="clickHandle"
          style="color: var(--color-arona-blue)"
          >点击上传</a
        >
        <input
          id="uploadFile"
          type="file"
          style="display: none"
          @change="fileHandle($event)"
        />
      </div>
    </div>
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
  });
};

/**
 * 拖拽文件时阻止默认事件
 */
const dragOver = (e: DragEvent): void => {
  e.preventDefault();
};

const fileHandle = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = (target.files as FileList)[0];
  mainStore.setTitle(file.name);
  readFile(file).then(data => {
    let parsed: Scenario = {} as Scenario;
    try {
      parsed = JSON.parse(data) as Scenario;
    } catch {
      alert('文件格式错误');
      return;
    }
    mainStore.setScenario(parsed);
    console.log(mainStore.getScenario);
  });
};

const clickHandle = (): void => {
  const fileInput = document.getElementById('uploadFile') as HTMLInputElement;
  fileInput.click();
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
#tips {
  position: relative;
  z-index: 1;
}
#loadFile {
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  user-select: none;
}
.collider {
  position: absolute;
  top: 0%;
  left: 0%;
  flex: 1;
  background-color: transparent;
  width: 100%;
  height: 100%;
}
#upload {
  display: flex;
  position: absolute;
  top: 30vh;
  left: 35vw;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border: 1px dashed #e4e7ed;
  border-radius: 4px;
  background: #ffffff;
  width: 30vw;
  height: 15vw;
  text-align: center;
}
#uploadIMG {
  margin-top: 10%;
  margin-bottom: 5%;
  width: 25%;
  height: 30%;
}
</style>
