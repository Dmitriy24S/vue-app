<template>
  <select class="select" :value="modelValue" @change="changeOptions">
    <option disabled value="" selected>Select sort</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MySelect',
  setup() {
    return {}
  },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      // type: Array,
      type: Array as () => { value: string; name: string }[],
      default: () => []
    }
  },
  methods: {
    changeOptions(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLSelectElement).value)
    }
  }
})
</script>

<style scoped>
.select {
  padding: 1rem;
  border: 1px solid teal;
  color: teal;
  cursor: pointer;
}
.select:hover {
  background-color: teal;
  color: white;
}
.select:focus-visible {
  background-color: teal;
  color: white;
}
</style>
