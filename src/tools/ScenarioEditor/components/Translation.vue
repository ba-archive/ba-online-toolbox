<template>
  <div id="translation">
    <div id="reference">
      <n-button secondary type="info" style="margin: 16px"
        >参考文本语言</n-button
      >
      <span>
        <n-button
          v-for="lang in Object.keys(langHash)"
          :focusable="false"
          @click="config.setLanguage(lang as Language)"
          :class="config.getLanguage == lang ? 'selectedLanguage' : ''"
          >{{ langHash[lang as Language] }}</n-button
        ></span
      >
      <n-button
        :type="config.isProofread ? 'success' : 'error'"
        @click="config.setProofread(!config.isProofread)"
      >
        校对模式: {{ config.isProofread ? '开' : '关' }}
      </n-button>
      <br />
    </div>
    <div id="referLang">
      <n-input
        type="textarea"
        style="width: 95%; margin-left: 2.5%; height: 80px"
        :value="
          config.getSelectLine != -1
            ? mainStore.getScenario.content[config.getSelectLine][
                config.getLanguage
              ]?.replaceAll('#n', '[#n]')
            : '请选择一行'
        "
        :placeholder="
          config.getSelectLine != -1
            ? mainStore.getScenario.content[config.getSelectLine][
                config.getLanguage
              ] || '该语言暂无翻译'
            : ''
        "
      ></n-input>
    </div>
    <div id="trans">
      <span>
        <n-dropdown
          trigger="hover"
          :options="langSelect"
          @select="
            {
              config.setTargetLang($event as Language);
            }
          "
        >
          <n-button secondary type="info">
            目标语言: {{ langHash[config.getTargetLang] }}
          </n-button>
        </n-dropdown>
        <n-button
          :type="
            config.getSelectLine != -1
              ? mainStore.getScenario.content[config.getSelectLine].Unsure
                ? 'error'
                : 'success'
              : undefined
          "
          @click="
            () => {
              if (config.getSelectLine != -1) {
                mainStore.getScenario.content[config.getSelectLine].Unsure =
                  !mainStore.getScenario.content[config.getSelectLine].Unsure;
              }
            }
          "
        >
          {{
            config.getSelectLine != -1
              ? mainStore.getScenario.content[config.getSelectLine].Unsure
                ? '我有疑问'
                : '没有问题'
              : '存在疑问'
          }}
        </n-button>
        <n-button @click="config.changeLanguage"
          >显示语言:
          {{
            config.isSwitchLanguage == 3
              ? '全部'
              : config.isSwitchLanguage == 2
              ? '参考语言'
              : '目标语言'
          }}</n-button
        ></span
      >
      <span>
        <n-button @click="translateHandle">翻译参考文本</n-button>
        <n-button @click="acceptHandle">接受机翻</n-button>
      </span>
    </div>
    <div id="textLine">
      <n-input
        id="ansInput"
        type="textarea"
        :value="
          config.getSelectLine != -1
            ? textPrefab(
                mainStore.getScenario.content[config.getSelectLine][
                  config.getTargetLang
                ]
              )
            : ''
        "
        @input="inputHandle"
        style="width: 55%; margin-left: 2.5%; height: 120px"
      ></n-input>
      <n-input
        type="textarea"
        placeholder="机翻结果"
        :value="config.tmpMachineTranslate"
        style="width: 30%; height: 120px; margin: 0px 16px 0px 16px"
      >
      </n-input>
    </div>
    <div id="comment">
      <n-input
        :value="
          config.getSelectLine != -1
            ? mainStore.getScenario.content[config.getSelectLine].comment || ''
            : ''
        "
        :placeholder="config.getSelectLine != -1 ? '请输入备注' : ''"
        @input="commentHandle"
        style="width: 95%; margin-left: 2.5%"
      >
      </n-input>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NButton, NCheckbox, NDropdown, NInput, NSpace } from 'naive-ui';
import { translate } from '../../public/getTranslation';
import { useGlobalConfig } from '../store/configStore';
import { useScenarioStore } from '../store/scenarioEditorStore';
import { ContentLine, Language } from '../types/content';

const config = useGlobalConfig();
const mainStore = useScenarioStore();

const langHash = {
  TextJp: '日语',
  TextEn: '英语',
  TextKr: '韩语',
  TextTh: '泰文',
  TextCn: '简中',
  TextTw: '繁中',
};

const translateHash = {
  TextJp: 'ja',
  TextEn: 'en',
  TextKr: 'ko',
  TextTh: 'th',
  TextCn: 'zh-CHS',
  TextTw: 'zh-CHT',
};

const langSelect = [
  { label: '简体中文', key: 'TextCn' },
  { label: '繁体中文', key: 'TextTw' },
  { label: '日文', key: 'TextJp' },
  { label: '英文', key: 'TextEn' },
  { label: '韩文', key: 'TextKr' },
  { label: '泰文', key: 'TextTh' },
];
const inputHandle = (event: string) => {
  if (config.getSelectLine != -1) {
    const line = mainStore.getScenario.content[config.getSelectLine];
    line[config.getTargetLang] = event.replaceAll('[#n]', '#n');
    mainStore.setContentLine(line as ContentLine, config.getSelectLine);
  }
};

const translateHandle = () => {
  if (config.getSelectLine != -1) {
    const text = mainStore.getScenario.content[config.getSelectLine][
      config.getLanguage
    ]
      ?.replaceAll('#n', '[#n]')
      ?.replaceAll(/\[.*?\]/g, '');
    translate(
      text,
      'auto' || translateHash[config.getLanguage],
      translateHash[config.getTargetLang]
    )
      .then(res => {
        config.setTmpMachineTranslate(res.translation[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const acceptHandle = () => {
  if (config.getSelectLine != -1) {
    const line = mainStore.getScenario.content[config.getSelectLine];
    if (line[config.getLanguage].split(/(\[.*?\])/g).length > 1) {
      alert('文本中有特殊标记, 请注意添加~');
    }
    line[config.getTargetLang] = config.tmpMachineTranslate;
    mainStore.setContentLine(line as ContentLine, config.getSelectLine);
  }
};

const commentHandle = (event: string) => {
  if (config.getSelectLine != -1) {
    const line = mainStore.getScenario.content[config.getSelectLine];
    line.comment = event;
    mainStore.setContentLine(line as ContentLine, config.getSelectLine);
  }
};

const textPrefab = (text: string) => {
  return text ? text.replaceAll('#n', '[#n]') : '';
};
</script>
<style>
.selectedLanguage {
  background-color: var(--color-arona-blue);
  color: white;
}
#reference > *,
#trans > * {
  margin: 8px;
  width: auto;
}
#trans {
  margin: 16px;
}
#trans > * {
  min-width: 100px;
}
#reference {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
#trans,
#textLine {
  display: flex;
  justify-content: space-between;
}
</style>
