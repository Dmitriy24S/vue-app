<template>
  <div class="likes">
    <div>
      <button @click="handleLike">Like</button>
      <button @click="handleDislike">Dislike</button>
    </div>
    <div>
      <p>
        Likes: <strong>{{ likes }}</strong>
      </p>
      <p>
        Dislikes: <strong>{{ dislikes }}</strong>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      likes: 22,
      dislikes: 0
    }
  },
  methods: {
    handleLike() {
      this.likes += 1
    },
    handleDislike() {
      this.dislikes += 1
    }
  }
}
</script>

<style scoped>
.likes {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.likes div {
  min-width: 15rem;
}
.likes button {
  width: 100%;
  padding: 0.7rem;
}
</style>
