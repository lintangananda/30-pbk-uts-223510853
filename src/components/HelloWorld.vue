<template>
  <div>
    <header>
      <button @click="showPosts">Posts</button>
      <button @click="showTodos">Todos</button>
    </header>
    <div v-if="view === 'posts'">
      <div class="post-app">
        <h1> DATA USER </h1> <br>
        <p1> Select Option :</p1>
        <select v-model="selectedUser" @change="fetchPosts">
          <option value="" selected disabled>Pilih User</option>
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
      
        <div v-if="posts.length > 0">
          <ul>
            <li v-for="post in posts" :key="post.id">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
    <div v-else-if="view === 'todos'">
      <div class="todo-app">
        <h1>To Do List</h1>
        <form @submit.prevent="addActivity">
          <input type="text" v-model="newActivity" placeholder="Add New Activity">
          <button type="submit">Add Task</button>
        </form>
        <ul class="activities-list">
          <li v-for="activity in filteredActivities" :key="activity.id">
            <input type="checkbox" v-model="activity.completed">
            <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
            <button @click="cancelActivity(activity.id)">Delete</button>
          </li>
        </ul>
        <label>
          <input type="checkbox" v-model="showIncompleteOnly">
          Unfinished
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const view = ref('posts'); // Set initial view to 'posts'
const newActivity = ref('');
const activities = ref([
  { id: 1, name: 'Cooking', completed: false },
  { id: 2, name: 'Feeding pets', completed: false }
]);
const showIncompleteOnly = ref(false);
const users = ref([]);
const selectedUser = ref(null);
const posts = ref([]);

function addActivity() {
  if (newActivity.value.trim() !== '') {
    activities.value.push({ id: Date.now(), name: newActivity.value, completed: false });
    newActivity.value = '';
  }
}

function cancelActivity(id) {
  const index = activities.value.findIndex(activity => activity.id === id);
  if (index !== -1) {
    activities.value.splice(index, 1);
  }
}

function showPosts() {
  view.value = 'posts';
  if (selectedUser.value) {
    fetchPosts();
  }
}

function showTodos() {
  view.value = 'todos';
}

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users.value = data;
    })
    .catch(error => console.error('Error fetching users:', error));
}

function fetchPosts() {
  if (selectedUser.value) {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}')
      .then(response => response.json())
      .then(data => {
        posts.value = data;
      })
      .catch(error => console.error('Error fetching posts:', error));
  }
}

const filteredActivities = computed(() => {
  if (showIncompleteOnly.value) {
    return activities.value.filter(activity => !activity.completed);
  } else {
    return activities.value;
  }
});

// Fetch users on component mount
fetchUsers();
</script>

<style scoped>
body {
  background-color: #ffd9e6;
  color: #333;
}

header {
  background-color: #ff69b4;
  padding: 10px;
  text-align: center;
  border-radius: 10px 10px 0 0;
}

header button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 8px;
  transition: background-color 0.3s ease;
}

header button:hover {
  background-color: #e55a9f;
}

.post-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.post-app h1 {
  color: #ff69b4;
  font-size: 40px;
  font-family: Georgia, serif;
  margin-bottom: 30px;
}

.post-app select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
}

.post-app ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.post-app ul li {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-app ul li h3 {
  margin: 0 0 10px;
  font-size: 24px;
  color: #333;
}

.post-app ul li p {
  margin: 0;
  color: #666;
}

.todo-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #ffd9e6;
  padding: 40px;
  width: 100%;
  box-sizing: border-box;
}

h1 {
  color: #ff69b4;
  font-size: 40px;
  font-family: Georgia, serif;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  border: none;
  border-radius: 6px;
  outline: none;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #ff69b4;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #e55a9f;
}

.activities-list {
  width: 100%;
  max-width: 600px;
  padding: 0;
  list-style-type: none;
}

.activities-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.activities-list li button {
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #ff69b4;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.activities-list li button:hover {
  background-color: #e55a9f;
}

.activities-list li .completed {
  text-decoration: line-through;
  color: #888;
}
</style>