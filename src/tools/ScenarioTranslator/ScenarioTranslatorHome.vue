<template>
    <n-card>
        <input type="file" @change="handleFileChange" />
        <br />
        <n-input type="text" :placeholder="mainStore.getTitle || '请输入标题'" @change="HandleTitleChange($event)"
            style="width: 300px;" />
        <br />
        <n-button @click="handleDownload" style="margin-right: 20px;">保存 (下载文件)</n-button>
        <n-button @click="mainStore.clearAll" style="margin-right: 20px;">清空 (注意: 此操作<span
                style="color: red;">不可逆</span>)</n-button>
    </n-card>
    <n-card>
        临时剧情翻译GUI<br />
        由于时间原因暂未对特殊标记进行处理, 请翻译人员尽量不要改动"[]"的内容以及形如"#n"的标记<br />
        如果对于标记有任何疑问, 可以只输入翻译完成后的句子并在最前方加上"UnFormatted"供技术人员修改<br />
    </n-card>
    <TranslatorCard v-for="(line, index) in mainStore.getScenario" :index="index" :line="line" />
</template>
<script setup lang="ts">
import TranslatorCard from './components/TranslatorCard.vue';
import { Scenario } from './types/scenario';
import { useMainStore } from './store/mainStore';
import { NCard, NButton, NInput } from 'naive-ui';
import { saveAs } from 'file-saver';

const mainStore = useMainStore();

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
        const parsed = JSON.parse(data) as Scenario[];
        mainStore.setScenario(parsed);
        console.log(mainStore.getScenario);
    });
}

function handleDownload() {
    const blob = new Blob([JSON.stringify(mainStore.getScenario)], {
        type: 'application/json',
    });
    const date = new Date().toLocaleString().replace(/:/g, '-').replace(/\//g, '-');
    saveAs(blob, `${mainStore.getTitle}.${date}.json`);
}

function HandleTitleChange(event: string) {
    mainStore.setTitle(event);
}
</script>