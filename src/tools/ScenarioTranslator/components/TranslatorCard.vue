<template>
  <card-unit
    type="None"
    title="剧情正文"
    v-if="line?.TextJp"
    style="margin-bottom: 20px"
    @flag-unsure="handleFlagUnsure"
  >
    <n-tag style="width: fit-content" :bordered="false">日文</n-tag>
    <n-input type="textarea" :value="`${formatText}`"></n-input>
    <br />
    翻译:
    <n-input
      type="textarea"
      :placeholder="`${line[mainStore.getLanguage]}`"
      @change="changeHandler($event, mainStore.original)"
    ></n-input>
  </card-unit>
</template>
<script setup lang="ts">
import CardUnit from '../../public/components/CardUnit.vue';
import { useMainStore } from '../store/mainStore';
import { ContentLine } from '../types/content';

const mainStore = useMainStore();
const props = defineProps<{
  line: ContentLine;
  index: number;
}>();

let formatText = '';
let textList: string[] = [];
if (!mainStore.original) {
  // 分离[]标记, 获得文本字符串
  // 在修改文本之后, 还原原字符串格式
  let rawText = props.line.TextJp.replaceAll('#n', '[#n]');
  rawText = rawText.replaceAll('\n', '[\\n]');
  const textList = rawText.split(/(\[.*?\])/);
  console.log(textList);
  for (let i = 0; i < textList.length; i++) {
    if (textList[i].startsWith('[') || textList[i] === '') {
      continue;
    }

    formatText += textList[i] + '[\\]';
  }
  formatText = formatText.slice(0, -3);
} else {
  formatText = props.line.TextJp;
}
function changeHandler(event: string, original: boolean) {
  if (!original) {
    if (formatText.split('[\\]').length !== event.split('[\\]').length) {
      alert('翻译后的文本与原文不匹配, 请检查');
      return;
    }
    let ptr = 0;
    for (let i = 0; i < textList.length; i++) {
      if (textList[i].startsWith('[') || textList[i] === '') {
        continue;
      }
      textList[i] = event.split('[\\]')[ptr];
      ptr++;
    }
    let newText = '';
    for (let i = 0; i < textList.length; i++) {
      newText += textList[i];
    }
    newText = newText.replaceAll('[#n]', '#n');
    newText = newText.replaceAll('[\\n]', '\n');
    console.log(newText);
  }
  /* eslint-disable-next-line vue/no-mutating-props */
  props.line[mainStore.getLanguage] = event; // FIXME: 避免直接修改 props
  mainStore.updateScenario(props.line, props.index);
}

function handleFlagUnsure(value: boolean) {
  props.line.Unsure = value;
}
</script>
