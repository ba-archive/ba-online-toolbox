<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const mainRoutes = router
  .getRoutes()
  .filter(route => route.meta?.shouldShowInHomepageNav)
  .sort((a, b) => {
    return (a.meta?.navOrder as number) - (b.meta?.navOrder as number) || 0;
  });
</script>

<template>
  <div class="main-page-screen fill-screen center">
    <div class="main-page-navigation">
      <router-link
        class="home-nav-link rounded-small shadow-far"
        v-for="mainRoute in mainRoutes"
        :key="mainRoute.path"
        :to="mainRoute.path"
      >
        <img :src="mainRoute.meta?.icon" alt="" />
        <span>{{ mainRoute.meta.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-page-navigation {
  display: grid;
  gap: 1rem;
  grid-auto-rows: min-content;

  .home-nav-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: #ffffff;
    padding: 8px;
    text-decoration: none;
    color: #333;
    font-weight: bold;

    img {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
  }
}
</style>
