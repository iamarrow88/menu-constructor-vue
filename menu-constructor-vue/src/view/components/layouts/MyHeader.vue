<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <img
      alt="Site logo"
      class="logo"
      src="../../assets/logo/cooking-logo.svg"
      width="125"
      height="125"
    />

    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/base">Menu Base</RouterLink>
      <RouterLink to="/menu">Menu constructor</RouterLink>
      <RouterLink to="/shopping-list">Shopping list</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 20rem;
  align-self: flex-start;
  line-height: 1.5;
  max-height: 100px;
  width: 100%;
}

.logo {
  display: block;
  width: 108px;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: var(--font-family), sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: var(--dark);
  text-align: center;
}

nav a.router-link-exact-active {
  border-bottom: 4px solid var(--primary-color-3);
  border-radius: 2px;
  padding: 8px;
  height: 30px;
  opacity: 1;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  color: var(--color-text);
  opacity: 0.4;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media (hover: hover) {
  a:hover {
    opacity: 0.7;
  }
}
</style>
