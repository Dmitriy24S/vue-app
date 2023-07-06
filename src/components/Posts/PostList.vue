<template>
  <div class="container">
    <h3>Post List</h3>
    <PostItem v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post)" />
  </div>
</template>

<script lang="ts">
// import PostItem from './PostItem.vue'
import PostItem from '@/components/Posts/PostItem.vue'

export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array as () => { id: number; title: string; body: string }[],
      required: true
    }
  }
}
</script>

<style scoped>
h3 {
  font-size: 1.8rem;
  color: teal;
  font-weight: 600;
}

.container {
  width: 100%;
}
</style>
