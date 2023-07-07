<template>
  <div class="container">
    <!-- v-show -->
    <div v-if="posts.length > 0">
      <h3>Post List</h3>
      <PostItem v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post)" />
    </div>
    <h3 v-else-if="posts.length === 0">No Posts</h3>
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
</style>
