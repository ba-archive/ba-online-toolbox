<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HomepageNavigator from './HomepageNavigator.vue';

const route = useRoute();
const router = useRouter();

const isMainPage = computed(() => {
  return '/' === route.path;
});

const navRoutes = router
  .getRoutes()
  .filter(route => route.meta?.shouldShowInNavbar)
  .sort((a, b) => {
    return (a.meta?.navOrder as number) - (b.meta?.navOrder as number) || 0;
  });
</script>

<template>
  <div class="nav-bar">
    <router-link
      v-for="navRoute in navRoutes"
      :key="navRoute.path"
      :to="navRoute.path"
    >
      {{ navRoute.meta?.title }}
    </router-link>
  </div>
  <homepage-navigator v-if="isMainPage" />
  <router-view></router-view>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100vw;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  font-weight: bold;
  user-select: none;
  font-size: 16px;

  a {
    text-decoration: none;
    color: #3f88f2;
    position: relative;
    padding: 16px 8px;
    transition: all 0.375s ease-in-out;

    &:hover {
      color: #fff;
      background-color: #3f88f2;
    }

    &.router-link-exact-active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #3f88f2;
      }
    }
  }
}
</style>
