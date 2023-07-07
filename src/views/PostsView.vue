<template>
  <div class="container">
    <LikesCounter />
    <div class="posts-container">
      <h2>Posts</h2>
      <MyButton @click="showDialog">Create Post</MyButton>
      <MyDialog v-model:show="dialogVisible">
        <PostForm @create="createPost" />
      </MyDialog>
    </div>
    <PostList :posts="posts" @remove="removePost" />
  </div>
</template>

<script lang="ts">
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
      dialogVisible: false
    }
  },
  methods: {
    createPost(newPost: any) {
      // console.log('newPost', newPost) // Proxy(Object) {title: '123', body: '123', id: 880}
      this.posts.push(newPost)
      this.dialogVisible = false
    },
    removePost(post: any) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    }
  }
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

strong {
  font-weight: 700;
}

h2 {
  font-size: 2rem;
  color: teal;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
</style>
