<template>
  <button class="btn">
    <slot>Action</slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'MyButton'
}
</script>

<style scoped>
/* button { */
.btn {
  width: 100%;
  padding: 1rem;
  border: 1px solid teal;
  color: teal;
  background-color: transparent;
  font-weight: 500;
  cursor: pointer;
}
.btn:hover {
  background-color: teal;
  color: white;
}
.btn:focus-visible {
  background-color: teal;
  color: white;
}
</style>
