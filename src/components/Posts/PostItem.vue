<template>
  <div class="post">
    <div class="">
      <div><strong>Title: </strong> {{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>
    <div class="buttons">
      <MyButton @click="$emit('remove', post)">Delete</MyButton>
    </div>
  </div>
</template>

<script lang="ts">
// import MyButton from '@/components/UI/MyButton.vue'
export default {
  // components: { MyButton },
  props: {
    post: {
      type: Object as () => { title: string; body: string },
      required: true
    }
  }
}
</script>

<style>
.post {
  padding: 1rem;
  border: 2px solid teal;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
</style>
