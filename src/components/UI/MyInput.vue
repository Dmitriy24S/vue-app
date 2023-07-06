<template>
  <input :value="modelValue" @input="updateInput" type="text" class="input" />
</template>

<script lang="ts">
export default {
  name: 'MyInput',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 1rem;
  font-size: inherit;
  font-family: inherit;
  border: 1px solid teal;
}
</style>
