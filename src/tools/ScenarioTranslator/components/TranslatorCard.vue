<template>
    <n-card v-if="line?.TextJp" style="margin-bottom: 20px;">
        日文原文: <n-input type="text" :value="`${line.TextJp}`"></n-input>
        <br>
        翻译: <n-input type="text" :placeholder="`${line.TextCn}`" @change="changeHandler($event)"></n-input>
    </n-card>
</template>
<script setup lang="ts">
import { Scenario } from '../types/scenario';
import { NButton, NCard, NInput } from 'naive-ui';
import { useMainStore } from '../store/mainStore';


const mainStore = useMainStore();
const props = defineProps<{
    line: Scenario;
    index: number;
}>();

function changeHandler(event: string) {
    props.line.TextCn = event;
    mainStore.updateScenario(props.line, props.index);
}

</script>