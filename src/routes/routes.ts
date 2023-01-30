import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    icon: string;
    shouldShowInHomepageNav: boolean;
    shouldShowInNavbar: boolean;
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
      navOrder: 0,
    },
    children: [
      {
        path: '/momotalk',
        name: 'TranslateMomotalk',
        meta: {
          shouldShowInHomepageNav: true,
          shouldShowInNavbar: true,
          icon: '/image/translation.svg',
          title: 'Momotalk 翻译',
          navOrder: 1,
        },
        component: () =>
          import('../tools/MomotalkTranslator/MomotalkTranslatorHome.vue'),
      },
    ],
  },
];

const routerConvert = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routerConvert, routes };
