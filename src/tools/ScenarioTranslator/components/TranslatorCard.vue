<template>
  <n-card v-if="line?.TextJp" style="margin-bottom: 20px">
    日文原文: <n-input type="text" :value="`${formatText}`"></n-input>
    <br />
    翻译:
    <n-input type="text" :placeholder="`${line[mainStore.getLanguage]}`" @change="changeHandler($event)"></n-input>
  </n-card>
</template>
<script setup lang="ts">
import { NCard, NInput } from 'naive-ui';
import { useMainStore } from '../store/mainStore';
import { ContentLine } from '../types/content';

const mainStore = useMainStore();
const props = defineProps<{
  line: ContentLine;
  index: number;
}>();

// 分离[]标记, 获得文本字符串
// 在修改文本之后, 还原原字符串格式
let rawText = props.line.TextJp.replaceAll("#n", "[#n]");
const textList = rawText.split(/(\[.*?\])/);
console.log(textList)
let formatText = "";
for (let i = 0; i < textList.length; i++) {
  if (textList[i].startsWith('[') || textList[i] == "") {
    continue;
  }

  formatText += textList[i] + "[\\]";
}
formatText = formatText.slice(0, -3);






function changeHandler(event: string) {
  if (formatText.split("\\").length !== event.split("\\").length) {
    alert("翻译后的文本与原文不匹配, 请检查");
    return;
  }
  let ptr = 0;
  for (let i = 0; i < textList.length; i++) {
    if (textList[i].startsWith('[') || textList[i] == "") {
      continue;
    }
    textList[i] = event.split("\\")[ptr];
    ptr++;
  }
  let newText = "";
  for (let i = 0; i < textList.length; i++) {
    newText += textList[i];
  }
  newText = newText.replaceAll("[#n]", "#n");
  console.log(newText);

  props.line[mainStore.getLanguage] = event;
  mainStore.updateScenario(props.line, props.index);
}
</script>
