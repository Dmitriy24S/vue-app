<template>
  <NavMenu />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
</script>

<style scoped></style>
