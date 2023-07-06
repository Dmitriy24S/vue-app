<template>
  <div class="container">
    <LikesCounter />
    <PostForm @create="createPost" />
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
      ]
    }
  },
  methods: {
    createPost(newPost: any) {
      // console.log('newPost', newPost) // Proxy(Object) {title: '123', body: '123', id: 880}
      this.posts.push(newPost)
    },
    removePost(post: any) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    }
  }
}
</script>

<style>
/* @media (min-width: 1024px) { } */

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-top: 2rem;
}

strong {
  font-weight: 700;
}

button {
  cursor: pointer;
}
</style>
