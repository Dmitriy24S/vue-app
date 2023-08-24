<template>
  <div class="container">
    <LikesCounter />
    <div class="posts-container">
      <h2>Posts</h2>
      <MyInput v-model="searchQuery" placeholder="Search post title" />
      <div class="post-buttons">
        <MyButton @click="fetchPosts">Get Posts</MyButton>
        <MyButton @click="showDialog">Create Post</MyButton>
        <MySelect v-model="selectedSort" :options="options" />
        <MyButton @click="togglePagination">Toggle Pagination</MyButton>
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
    <div
      ref="observer"
      class="observer"
      :style="{ display: usePagination ? 'none' : 'block' }"
    ></div>
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
      selectedSort: '',
      searchQuery: '',
      page: 1,
      postsAmountLimit: 10,
      totalPages: 0,
      usePagination: false
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
    changePage(pageNumber: number) {
      this.page = pageNumber
      // fetch v1:
      this.fetchPosts()
      window.scrollTo(0, 500)
    },
    togglePagination() {
      this.usePagination = !this.usePagination
      this.page = 1
      this.fetchPosts()
    },
    async fetchPosts() {
      try {
        this.isLoading = true
        // const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
          params: {
            _page: this.page,
            _limit: this.postsAmountLimit
          }
        })
        console.log('response', response) // {data: Array(10), status: 200, statusText: '', ... }
        if (response.status === 200) {
          // this.posts.push(...response.data)
          this.posts = response.data
          // pagination:
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postsAmountLimit) // 101 posts / 10 per page = 11 page
        } else {
          console.log('response', response)
          throw new Error(response.statusText)
        }
      } catch (error) {
        console.log('fetchPosts error:', error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchMorePosts() {
      try {
        this.page += 1
        // this.isLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
          params: {
            _page: this.page,
            _limit: this.postsAmountLimit
          }
        })
        console.log('response', response) // {data: Array(10), status: 200, statusText: '', ... }
        if (response.status === 200) {
          this.posts.push(...response.data)
        } else {
          console.log('response', response)
          throw new Error(response.statusText)
        }
      } catch (error) {
        console.log('fetchPosts error:', error)
      } finally {
        // this.isLoading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
    const options = {
      // root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 1.0
    }
    // const callback: IntersectionObserverCallback = function (
    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        console.log('Intersecting observer')
        this.fetchMorePosts()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer as HTMLDivElement)
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
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  watch: {
    // sort posts v1:
    //   selectedSort(newValue: 'title' | 'body') {
    //     this.posts.sort((post1, post2) => {
    //       return post1[newValue].localeCompare(post2[newValue])
    //     })
    //   }
    // fetch v2:
    // page() {
    // this.fetchPosts()
    // }
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
