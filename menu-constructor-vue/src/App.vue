<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "@/components/layouts/Header.vue";
</script>

<template>
  <main class="main">
    <Header />
    <RouterView />
  </main>
</template>

<style>

.main {
  display: grid;
  grid-template-rows: 1fr 7fr;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.main > div {
  padding: 2rem;
}

</style>
