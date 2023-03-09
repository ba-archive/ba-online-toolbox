<template>
  <n-card>
    <input type="file" @change="handleFileChange" />
    <br /><br />
    <n-input
      type="text"
      :placeholder="mainStore.getTitle || '请输入标题'"
      @change="handleTitleChange($event)"
      style="width: 300px"
    />
    <br /><br />
    <n-button @click="handleDownload" style="margin-right: 20px"
      >保存 (下载文件)</n-button
    >
    <n-button @click="handleOutput" style="margin-right: 20px"
      >导出文件(清除unsure标识)</n-button
    >
    <n-button @click="mainStore.clearAll" style="margin-right: 20px"
      >清空 (注意: 此操作<span style="color: red">不可逆</span>)</n-button
    >
    <n-dropdown
      trigger="hover"
      :options="LanguageList"
      @select="changeLanguage"
    >
      <n-button style="margin-right: 20px">{{
        hm[mainStore.getLanguage]
      }}</n-button>
    </n-dropdown>
    <n-button @click="copyToClipboard('[\\]')" style="margin-right: 20px"
      >复制标记</n-button
    >
    <n-button @click="handleSwitch" style="margin-right: 20px"
      >切换显示方式: {{ mainStore.original ? '原文' : '预处理' }}</n-button
    >
    <br /><br />
    <p>为避免意外发生, 请在读取文件之前完成配置, 更换文件之前务必点击清空</p>
  </n-card>
  <n-card>
    临时剧情翻译GUI<br />
    如果使用的是预处理模式: <br />
    请注意原句中出现的"<span style="color: red">[\]</span>"标记是分割标记,
    标记前后可能是一个完整的句子或者两个独立的句子<br />
    在翻译的时候请注意保持句子中[\]标记数量的一致性<br />
    如果对于标记有任何疑问,
    可以只输入翻译完成后的句子并在最前方加上"UnFormatted"供技术人员修改<br />
  </n-card>
  <!-- eslint-disable vue/valid-v-for -->
  <TranslatorCard
    class="translator-card"
    v-for="(line, index) in mainStore.getScenario.content"
    :index="index"
    :line="line"
    :language="mainStore.getLanguage"
  />
  <!-- eslint-enable vue/valid-v-for -->
</template>
<script setup lang="ts">
import { saveAs } from 'file-saver';
import { NButton, NCard, NDropdown, NInput } from 'naive-ui';
import TranslatorCard from './components/TranslatorCard.vue';
import { useMainStore } from './store/mainStore';
import { Language, Scenario } from './types/content';

const mainStore = useMainStore();

const LanguageList = [
  { label: '简体中文', key: 'TextCn' },
  { label: '繁体中文', key: 'TextTw' },
  { label: '日文', key: 'TextJp' },
  { label: '英文', key: 'TextEn' },
  { label: '韩文', key: 'TextKr' },
  { label: '泰文', key: 'TextTh' },
];

const hm = {
  TextCn: '简体中文',
  TextTw: '繁体中文',
  TextJp: '日文',
  TextEn: '英文',
  TextKr: '韩文',
  TextTh: '泰文',
};

function changeLanguage(key: Language) {
  mainStore.setLanguage(key);
}

function readFile(file: File): Promise<string> {
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
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = (target.files as FileList)[0];
  mainStore.setTitle(file.name);
  readFile(file).then(data => {
    const parsed = JSON.parse(data) as Scenario;
    mainStore.setScenario(parsed);
    console.log(mainStore.getScenario);
  });
}

function handleDownload() {
  const blob = new Blob([JSON.stringify(mainStore.getScenario)], {
    type: 'application/json',
  });
  const date = new Date()
    .toLocaleString()
    .replace(/:/g, '-')
    .replace(/\//g, '-');
  saveAs(blob, `${mainStore.getTitle}.${date}.json`);
}

function handleOutput() {
  for (let i = 0; i < mainStore.getScenario.content.length; i++) {
    mainStore.getScenario.content[i].Unsure = undefined;
  }
  const blob = new Blob([JSON.stringify(mainStore.getScenario)], {
    type: 'application/json',
  });
  const date = new Date()
    .toLocaleString()
    .replace(/:/g, '-')
    .replace(/\//g, '-');
  saveAs(blob, `${mainStore.getTitle}.${date}.json`);
}

function handleSwitch() {
  mainStore.SwitchOriginal();
}

function handleTitleChange(event: string) {
  mainStore.setTitle(event);
}

// 复制内容到剪贴板
function copyToClipboard(text: string) {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    console.log('复制成功');
  }
  document.body.removeChild(input);
}
</script>

<style scoped lang="scss">
.translator-card {
  width: 40rem;
}
</style>
