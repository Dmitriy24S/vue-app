<template>
  <div class="dialog" v-if="show === true" @click="hideDialog">
    <div class="dialog__content" @click.stop>
      <button aria-label="close dialog" class="dialog__close-btn" @click="hideDialog">
        &times;
      </button>
      <slot>Content</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import toggleMixin from '@/mixins/toggleMixin'

export default defineComponent({
  name: 'MyDialog',
  mixins: [toggleMixin],
  setup() {
    return {}
  },
  // without mixin:
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // methods: {
  //   hideDialog() {
  //     this.$emit('update:show', false)
  //   }
  // }
  mounted() {
    console.log('dialog mounted')
  }
})
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}

.dialog__content {
  position: relative;
  margin: auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
}

.dialog__close-btn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: none;
  background-color: transparent;
  font-size: 1.7rem;
  cursor: pointer;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}
.dialog__close-btn:hover,
.dialog__close-btn:focus-visible {
  background-color: teal;
  color: white;
}
</style>
