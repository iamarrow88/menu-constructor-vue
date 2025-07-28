<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyHeader from '@/components/layouts/MyHeader.vue'
</script>

<template>
  <main class="main">
    <MyHeader />
    <RouterView />
  </main>
</template>

<style>
.main {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.main > div {
  padding: 2rem;
}
</style>
