<template>
  <div id="footer">
    <div id="content">
      <span
        >文件名为: [{{ config.isProofread ? '已校对' : '未校对' }}]_{{
          mainStore.getScenario.GroupId
        }}.yml
      </span>
      <n-button type="primary" @click="downloadHandle">保存内容</n-button>
      <n-button type="error" @click="mainStore.clearAll">清空全部内容</n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { saveAs } from 'file-saver';
import jsYaml from 'js-yaml';
import { NButton } from 'naive-ui';
import { useGlobalConfig } from '../store/configStore';
import { useScenarioStore } from '../store/scenarioEditorStore';
import { Scenario } from '../types/content';

const mainStore = useScenarioStore();
const config = useGlobalConfig();

const downloadHandle = () => {
  const blob = new Blob([jsYaml.dump(mainStore.getScenario)], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(
    blob,
    `[${config.isProofread ? '已校对' : '未校对'}]_${
      mainStore.getScenario.GroupId
    }.yml`
  );
};
</script>
<style>
#content > * {
  margin-right: 20px;
}
#content {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 7.5vh;
}
</style>
