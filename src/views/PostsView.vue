<template>
  <div class="container">
    <LikesCounter />
    <div class="posts-container">
      <h2>Posts</h2>
      <div class="post-buttons">
        <MyButton @click="fetchPosts">Get Posts</MyButton>
        <MyButton @click="showDialog">Create Post</MyButton>
        <MySelect v-model="selectedSort" :options="options" />
      </div>
      <MyDialog v-model:show="dialogVisible">
        <PostForm @create="createPost" />
      </MyDialog>
    </div>
    <PostList v-if="isLoading === false" :posts="sortedPosts" @remove="removePost" />
    <p v-else-if="isLoading === true" class="loading-msg">Loading posts...</p>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

import PostForm from '@/components/Posts/PostForm.vue'
import PostList from '@/components/Posts/PostList.vue'
import LikesCounter from '@/components/LikesCounter/LikesCounter.vue'

export default {
  components: {
    PostForm,
    PostList,
    LikesCounter
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Post about JavaScript',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          id: 2,
          title: 'Post about JavaScript',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
          id: 3,
          title: 'Post about JavaScript',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ],
      dialogVisible: false,
      isLoading: false,
      options: [
        { name: 'By Title', value: 'title' },
        { name: 'By Description', value: 'body' }
      ],
      selectedSort: ''
    }
  },
  methods: {
    createPost(newPost: any) {
      this.posts.push(newPost) // Proxy(Object) {title: '123', body: '123', id: 880}
      this.dialogVisible = false
    },
    removePost(post: any) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10') // {data: Array(10), status: 200, statusText: '', ... }
        if (response.status === 200) {
          // this.posts.push(...response.data)
          this.posts = response.data
        } else {
          console.log('response', response)
          throw new Error(response.statusText)
        }
      } catch (error) {
        console.log('fetchPosts error:', error)
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      if (this.selectedSort === 'title' || this.selectedSort === 'body') {
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort as 'title' | 'body'].localeCompare(
            post2[this.selectedSort as 'title' | 'body']
          )
        })
      } else {
        return this.posts
      }
    }
  }
  // watch: {
  //   selectedSort(newValue: 'title' | 'body') {
  //     this.posts.sort((post1, post2) => {
  //       return post1[newValue].localeCompare(post2[newValue])
  //     })
  //   }
  // }
}
</script>

<style scoped>
/* @media (min-width: 1024px) { } */

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.posts-container {
  margin-top: 3rem;
}

h2 {
  font-size: 2rem;
  color: teal;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.post-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
}

.loading-msg {
  font-size: 1.8rem;
  margin-top: 2rem;
  text-align: center;
  color: teal;
}
</style>
