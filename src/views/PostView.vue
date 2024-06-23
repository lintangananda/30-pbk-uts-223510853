<template>
  <div class="user-posts-container">
    <h2>DATA USER</h2>
    <div class="user-select-card">
      <label for="user-select">Select Option:</label>
      <select id="user-select" v-model="selectedUserId" @change="onChange" :disabled="isLoadingUsers || isLoadingPosts">
        <option value="" disabled>Pilih pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-if="isLoadingUsers" class="loading">Memuat pengguna...</div>
    </div>
    <div v-if="isLoadingPosts" class="loading">Memuat postingan...</div>
    <div v-if="!isLoadingPosts && posts.length" class="post-list">
      <h2>Postingan</h2>
      <div class="posts-grid">
        <div v-for="post in posts" :key="post.id" class="post-item">
          <div class="post-card">
            <div class="post-header">{{ post.title }}</div>
            <div class="post-body">
              <p>{{ post.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLoadingPosts && posts.length === 0" class="no-posts">
      Loading
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { usePostStore } from '../stores/postStore';

export default {
  setup() {
    const postStore = usePostStore();
    const isLoadingUsers = ref(true); // Loading state for users
    const isLoadingPosts = ref(false); // Loading state for posts

    onMounted(async () => {
      try {
        await postStore.fetchUsers();
      } finally {
        isLoadingUsers.value = false;
      }
    });

    const onChange = async (event) => {
      const userId = event.target.value;
      try {
        isLoadingPosts.value = true; // Set isLoadingPosts to true when fetching posts
        await postStore.selectUser(userId);
      } finally {
        isLoadingPosts.value = false; // Set isLoadingPosts back to false after selecting user
      }
    };

    return {
      users: postStore.users,
      selectedUserId: computed(() => postStore.selectedUserId),
      posts: computed(() => postStore.posts),
      onChange,
      isLoadingUsers,
      isLoadingPosts,
    };
  },
};
</script>

<style scoped>

h2 {
  color: #ff69b4;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 520;
  font-size: 40px;
  font-family: Georgia, serif;
  font-weight: 600;
}

.user-posts-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  background-color: #ffd9e6;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.user-select-card {
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 350px; /* Adjust width as needed */
  text-align: center;
}

.user-select-card label {
  font-size: 1.2em;
  margin-bottom: 10px;
  display: block;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 16px;
  margin-bottom: 20px;
}

.loading {
  font-size: 1.2em;
  color: #42b983;
  text-align: center;
  margin-top: 10px;
}

.post-list {
  width: 100%;
  max-width: 1000px; /* Adjust width as needed */
  margin: 0 auto;
}

.post-list h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
  gap: 20px;
}

.post-item {
  list-style: none; /* Remove default list style */
}

.post-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 250px; /* Fixed height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-header {
  font-size: 18px;
  margin-bottom: 10px;
  color: #ffffff;
  background-color: #ff69b4;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
}

.post-body {
  margin: 0;
  color: #666;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.no-posts {
  margin-top: 20px;
  color: #666; /* Gray text */
  font-size: 1.2em;
}
</style>
