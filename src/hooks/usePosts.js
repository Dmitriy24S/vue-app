import axios from 'axios'
import { ref, onMounted } from 'vue'

export function usePosts(page, postsAmountLimit) {
  const posts = ref([
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
  ])
  // const page = ref(1)
  const totalPages = ref(0)
  const isLoading = ref(true)

  const addPost = (newPost) => {
    posts.value.unshift(newPost)
  }

  const removePost = (post) => {
    posts.value = posts.value.filter((p) => p.id !== post.id)
  }

  const fetchPosts = async () => {
    try {
      // this.isLoading = true
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
        params: {
          _page: page.value,
          _limit: postsAmountLimit
        }
      })
      console.log('response', response) // {data: Array(10), status: 200, statusText: '', ... }
      if (response.status === 200) {
        // this.posts.push(...response.data)
        posts.value = response.data
        // pagination:
        totalPages.value = Math.ceil(response.headers['x-total-count'] / postsAmountLimit) // 101 posts / 10 per page = 11 page
      } else {
        console.log('response', response)
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.log('fetchPosts error:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchMorePosts = async () => {
    try {
      page.value += 1
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
        params: {
          _page: page.value,
          _limit: postsAmountLimit
        }
      })
      console.log('response', response) // {data: Array(10), status: 200, statusText: '', ... }
      if (response.status === 200) {
        posts.value.push(...response.data)
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

  onMounted(fetchPosts)
  // onCreated()
  // computed()
  // watch()
  // watch(page, (page) => {
  // console.log('page', page)
  // fetchPosts()
  // })

  return {
    posts,
    isLoading,
    totalPages,
    fetchPosts,
    fetchMorePosts,
    page,
    addPost,
    removePost
  }
}
