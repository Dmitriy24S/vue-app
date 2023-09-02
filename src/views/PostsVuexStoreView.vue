<template>
  <div class="container">
    <LikesCounter />
    <div class="posts-container">
      <h2>Posts (Vuex)</h2>
      <p>likes: {{ $store.state.likes }}, double likes: {{ $store.getters.doubleLikes }}</p>
      <div>
        <button @click="$store.commit('incrementLikes')">Increment likes</button>
        <button @click="$store.commit('decrementLikes')">Decrement likes</button>
      </div>
      <br />
      <MyInput
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Search post title"
      />
      <div class="post-buttons">
        <MyButton @click="fetchPosts">Get Posts</MyButton>
        <MyButton @click="showDialog">Create Post</MyButton>
        <!-- <MySelect v-model="selectedSort" :options="options" /> -->
        <MySelect
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="options"
        />
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
        @click="changePage(pageNumber)"
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

<script>
import PostForm from '@/components/Posts/PostForm.vue'
import PostList from '@/components/Posts/PostList.vue'
import LikesCounter from '@/components/LikesCounter/LikesCounter.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    PostForm,
    PostList,
    LikesCounter
  },
  data() {
    return {
      dialogVisible: false,
      usePagination: false
    }
  },
  computed: {
    ...mapState({
      // posts: 'post/posts',
      posts: (state) => state.post.posts,
      isLoading: (state) => state.post.isLoading,
      options: (state) => state.post.options,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      postsAmountLimit: (state) => state.post.postsAmountLimit,
      totalPages: (state) => state.post.totalPages,
      usePagination: (state) => state.post.usePagination
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  methods: {
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      fetchMorePosts: 'post/fetchMorePosts'
    }),
    ...mapMutations({
      setPosts: 'post/setPosts',
      setLoading: 'post/setLoading',
      setPage: 'post/setPage',
      setTotalPages: 'post/setTotalPages',
      setSelectedSort: 'post/setSelectedSort',
      setSearchQuery: 'post/setSearchQuery',
      setUsePagination: 'post/setUsePagination'
    }),
    createPost(newPost) {
      // this.posts.push(newPost) // Proxy(Object) {title: '123', body: '123', id: 880}
      const posts = [newPost, ...this.posts]
      this.setPosts(posts)
      this.dialogVisible = false
    },
    removePost(post) {
      // this.posts = this.posts.filter((p) => p.id !== post.id)
      const posts = this.posts.filter((p) => p.id !== post.id)
      this.setPosts(posts)
    },
    showDialog() {
      this.dialogVisible = true
    },
    changePage(pageNumber) {
      this.setPage(pageNumber)
      // fetch v1:
      this.fetchPosts()
      window.scrollTo(0, 200)
    },
    togglePagination() {
      this.usePagination = !this.usePagination
      // this.page = 1
      this.setPage(1)
      this.fetchPosts()
    }
  },
  mounted() {
    this.fetchPosts()
  },
  watch: {}
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
