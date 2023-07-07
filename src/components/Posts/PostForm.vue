<template>
  <form @submit.prevent="handlePostSubmit">
    <h4>Create Post</h4>
    <MyInput v-model="post.title" type="text" name="title" id="title" placeholder="Post's title" />
    <MyInput v-model="post.body" type="text" name="body" id="body" placeholder="Post's body" />
    <MyButton type="submit" class="create-post-btn">Add Post</MyButton>
  </form>
</template>

<script lang="ts">
// import MyButton from '@/components/UI/MyButton.vue'

export default {
  components: {
    // MyButton
  },
  data() {
    return {
      post: {
        title: '',
        body: '',
        id: NaN
      }
    }
  },
  methods: {
    handlePostSubmit() {
      // this.post.id = Math.floor(Math.random() * 1000)
      this.post.id = Date.now()
      this.$emit('create', this.post) // Proxy(Object) {title: '1231', body: '23', id: 13}
      this.post = { title: '', body: '', id: NaN } // Clear the input fields after submission
    }
  }
}
</script>

<style>
form {
  margin-bottom: 1rem;
}
form h4 {
  font-size: 1.7rem;
  font-weight: 600;
  color: teal;
  margin-bottom: 1.25rem;
}
.create-post-btn {
  margin-top: 1.25rem;
}
</style>
