<template>
  <div>
    <h1>Post - {{ $route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  created() {
    // 💡 type inference enabled
  }
})
</script>

<style scoped></style>
