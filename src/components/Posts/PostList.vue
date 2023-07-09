<template>
  <div class="container">
    <!-- v-show -->
    <div v-if="posts.length > 0">
      <h3>Post List</h3>
      <TransitionGroup name="post-list" appear>
        <PostItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post)"
        />
      </TransitionGroup>
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

.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.25s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
