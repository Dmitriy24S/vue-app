import axios from 'axios'

export const postModule = {
  state: () => ({
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      })
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, bool) {
      state.isLoading = bool
    },
    setPage(state, page) {
      state.page = page
    },
    setTotalPages(state, pages) {
      state.totalPages = pages
    },
    setSelectedSort(state, sort) {
      state.selectedSort = sort
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    },
    setUsePagination(state, bool) {
      state.usePagination = bool
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true)
        // const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
          params: {
            _page: state.page,
            _limit: state.postsAmountLimit
          }
        })
        console.log('response', response) // {data: Array(10), status: 200, statusText: '', ... }
        if (response.status === 200) {
          // this.posts.push(...response.data)
          // state.posts = response.data
          commit('setPosts', response.data)
          // pagination:
          commit(
            'setTotalPages',
            Math.ceil(response.headers['x-total-count'] / state.postsAmountLimit)
          ) // 101 posts / 10 per page = 11 page
        } else {
          console.log('response', response)
          throw new Error(response.statusText)
        }
      } catch (error) {
        console.log('fetchPosts error:', error)
      } finally {
        // this.isLoading = false
        commit('setLoading', false)
      }
    },
    async fetchMorePosts({ state, commit }) {
      try {
        // state.page += 1
        commit('setPage', state.page + 1)
        // this.isLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
          params: {
            _page: state.page,
            _limit: state.postsAmountLimit
          }
        })
        console.log('response', response) // {data: Array(10), status: 200, statusText: '', ... }
        if (response.status === 200) {
          // state.posts.push(...response.data)
          commit('setPosts', [...state.posts, ...response.data]) // ?
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
  namespaced: true
}
