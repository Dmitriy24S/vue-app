<template>
  <div class="container">
    <LikesCounter />
    <div class="posts-container">
      <h2>Posts (CompositionApi)</h2>
      <p>likes: {{ likes }}, double likes: {{ doubleLikes }}</p>
      <div>
        <button @click="incrementLikes">Increment likes</button>
        <button @click="decrementLikes">Decrement likes</button>
      </div>
      <br />
      <MyInput v-focus v-model="searchQuery" placeholder="Search post title" />
      <div class="post-buttons">
        <MyButton @click="fetchPosts">Get Posts</MyButton>
        <MyButton @click="showDialog">Create Post</MyButton>
        <MySelect v-model="selectedSort" :options="options" />
        <MyButton @click="togglePagination">{{
          usePagination ? 'Switch to Infinite Scroll' : 'Switch to Pagination'
        }}</MyButton>
      </div>
      <MyDialog v-model:show="dialogVisible">
        <PostForm @create="createPost" />
      </MyDialog>
    </div>
    <PostList v-if="isLoading === false" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <p v-else-if="isLoading === true" class="loading-msg">Loading posts...</p>
    <!-- Pagination -->
    <div v-if="isLoading === false && usePagination" class="pagination">
      <button
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="pagination__page"
        :class="{
          'current-page': pageNumber === page
        }"
        @click="setPage(pageNumber)"
      >
        {{ pageNumber }}
      </button>
    </div>
    <!-- Infinite scrolling -->
    <!-- without directive: ref="observer" -->
    <div
      v-intersection="fetchMorePosts"
      class="observer"
      :style="{ display: usePagination ? 'none' : 'block' }"
    ></div>
  </div>
</template>

<script lang="ts">
import PostForm from '@/components/Posts/PostForm.vue'
import PostList from '@/components/Posts/PostList.vue'
import LikesCounter from '@/components/LikesCounter/LikesCounter.vue'
import { computed, ref } from 'vue'
import { usePosts } from '@/hooks/usePosts.js'
import { useSortedPosts } from '@/hooks/useSortedPosts.js'
import { useSortedAndSearchedPosts } from '@/hooks/useSortedAndSearchedPosts.js'

export default {
  components: {
    PostForm,
    PostList,
    LikesCounter
  },
  data() {
    return {
      // dialogVisible: false,
      options: [
        { name: 'By Title', value: 'title' },
        { name: 'By Description', value: 'body' }
      ]
      // selectedSort: '',
      // searchQuery: '',
    }
  },
  setup(props) {
    const likes = ref(4)
    const incrementLikes = () => {
      likes.value += 1
    }
    const decrementLikes = () => {
      likes.value -= 1
    }
    const doubleLikes = computed(() => likes.value * 2)

    const dialogVisible = ref(false)

    function showDialog() {
      dialogVisible.value = true
    }

    const usePagination = ref(false)

    const togglePagination = () => {
      usePagination.value = !usePagination.value
      // this.page = 1
      // this.fetchPosts()
      fetchPosts()
    }

    const page = ref(1)
    const setPage = (pageNum: number) => {
      page.value = pageNum
      fetchPosts()
      window.scrollTo(0, 500)
    }

    const { posts, totalPages, isLoading, fetchPosts, fetchMorePosts, addPost, removePost } =
      usePosts(page, 10)

    const { selectedSort, sortedPosts } = useSortedPosts(posts)
    const { sortedAndSearchedPosts, searchQuery } = useSortedAndSearchedPosts(sortedPosts)

    const createPost = (newPost: any) => {
      addPost(newPost)
      dialogVisible.value = false
    }

    return {
      likes,
      incrementLikes,
      decrementLikes,
      doubleLikes,
      posts,
      totalPages,
      isLoading,
      fetchPosts,
      fetchMorePosts,
      page,
      setPage,
      selectedSort,
      sortedPosts,
      sortedAndSearchedPosts,
      searchQuery,
      togglePagination,
      usePagination,
      showDialog,
      dialogVisible,
      createPost,
      removePost
    }
  }
}
</script>

<style>
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

.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;
}
.pagination__page {
  /* display: flex; */
  padding: 0.4rem;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}
.pagination__page:hover {
  background: teal;
  color: white;
}
.pagination__page.current-page {
  background: teal;
  color: white;
}

.observer {
  height: 30px;
  background-color: teal;
  margin-top: 4rem;
}
</style>
