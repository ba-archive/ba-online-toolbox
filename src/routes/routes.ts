import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    icon: string;
    shouldShowInHomepageNav: boolean;
    shouldShowInNavbar: boolean;
    description: string;
    navOrder: number;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      shouldShowInHomepageNav: false,
      shouldShowInNavbar: true,
      title: 'Home',
      icon: '/image/home.svg',
      description: '传送回主页',
      navOrder: 0,
    },
    children: [
      {
        path: 'aronaTalk',
        name: 'AronaTalk',
        meta: {
          shouldShowInHomepageNav: true,
          shouldShowInNavbar: true,
          icon: '/image/arona_icon.webp',
          title: 'AronaTalk',
          description: 'BA 前端标准靶场',
          navOrder: 1,
        },
        component: () => import('../tools/AronaTalk/AronaTalkHome.vue'),
      },
      {
        path: '/momotalk',
        name: 'TranslateMomotalk',
        meta: {
          shouldShowInHomepageNav: true,
          shouldShowInNavbar: false,
          icon: '/image/translation.svg',
          title: 'Momotalk 翻译',
          description: '开发人员用的 Momotalk 翻译工具',
          navOrder: 2,
        },
        component: () =>
          import('../tools/MomotalkTranslator/MomotalkTranslatorHome.vue'),
      },
      {
        path: '/translator',
        name: 'TranslateScneario',
        meta: {
          shouldShowInHomepageNav: true,
          shouldShowInNavbar: false,
          icon: '/image/translation.svg',
          title: '剧情翻译',
          description: '开发人员用的剧情翻译工具',
          navOrder: 2,
        },
        component: () =>
          import('../tools/ScenarioTranslator/ScenarioTranslatorHome.vue'),
      },
      {
        path: '/editor',
        name: 'ScnearioEditor',
        meta: {
          shouldShowInHomepageNav: true,
          shouldShowInNavbar: false,
          icon: '/image/translation.svg',
          title: '剧情编辑器',
          description: '剧情编辑器, 包括自定义剧情编辑以及剧情翻译',
          navOrder: 3,
        },
        component: () =>
          import('../tools/ScenarioEditor/ScenarioEditorHome.vue'),
      },
    ],
  },
];

const routerConvert = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routerConvert, routes };
