<template>
  <div>
    <MyButton @click="$router.push(`/posts`)">Back to list</MyButton>
    <h1 class="title">Post - {{ $route.params.id }}</h1>
    <div v-if="loading && !error">
      <p>Loading post...</p>
    </div>
    <div v-if="error">
      <p>Error loading post</p>
    </div>
    <div class="post" v-if="!loading && post">
      <div>
        <div><strong>Title: </strong> {{ post.title }}</div>
        <div><strong>Description: </strong>{{ post.body }}</div>
      </div>
      <!-- todo -->
      <!-- <div class="buttons"> -->
      <!-- <MyButton @click="$emit('remove', post)">Delete</MyButton> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

interface Post {
  id: number
  title: string
  body: string
}

export default defineComponent({
  // created() {
  // 💡 type inference enabled
  // },
  data() {
    const route = useRoute()
    // const post: Post | null = null
    const post: any = null // todo
    return {
      loading: false,
      error: false,
      post: post,
      route: route
    }
  },
  methods: {
    async fetchPost() {
      try {
        this.loading = true
        const response = await axios.get<Post>(
          `https://jsonplaceholder.typicode.com/posts/${this.route.params.id}`
        )
        this.post = response.data
        console.log('response', response)
      } catch (error) {
        console.log('error', error)
        this.error = true
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchPost()
  }
})
</script>

<style scoped>
.title {
  margin-top: 1rem;
}
</style>
