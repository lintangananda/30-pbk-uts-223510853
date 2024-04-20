<template>
  <div class="todo-app">
    <h1>Activity List</h1>
    
    <!-- Form untuk menambahkan kegiatan baru -->
    <form @submit.prevent="addActivity">
      <input type="text" v-model="newActivity" placeholder="Tambahkan kegiatan baru">
      <button type="submit">Tambah</button>
    </form>

    <!-- Daftar kegiatan -->
    <ul class="activities-list">
      <li v-for="activity in filteredActivities" :key="activity.id">
        <input type="checkbox" v-model="activity.completed">
        <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
        <button @click="cancelActivity(activity.id)">Hapus</button>
      </li>
    </ul>
    
    <!-- Filter kegiatan yang belum selesai -->
    <label>
      <input type="checkbox" v-model="showIncompleteOnly">
      Filter yang sudah selesai
    </label>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activities = ref([
  { id: 1, name: 'Melukis', completed: false },
  { id: 2, name: 'Memasak', completed: false }
]);

const newActivity = ref('');
const showIncompleteOnly = ref(false);

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

function completeActivity(activity) {
  activity.completed = !activity.completed;
}

const filteredActivities = computed(() => {
  if (showIncompleteOnly.value) {
    return activities.value.filter(activity => !activity.completed);
  } else {
    return activities.value;
  }
});
</script>

<style scoped>
/* Gaya CSS untuk komponen TodoApp */
.todo-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: pink; /* Warna latar belakang soft pink */
  padding: 40px; /* Tambahkan padding lebih besar */
  width: 100%; /* Mengisi lebar penuh dari parent element */
  box-sizing: border-box; /* Biarkan padding termasuk dalam perhitungan lebar */
}

/* Gaya CSS untuk judul */
h1 {
  color: #61063d; /* Warna judul  */
  font-size: 40px;
  font-family: Georgia, serif;
  margin-bottom: 30px;
}

/* Gaya CSS untuk form */
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px; /* Lebarkan form */
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px; /* Berikan margin bawah yang lebih besar */
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
  background-color: #ff69b4; /* Warna tombol pink */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #e055a3; /* Warna tombol pink lebih gelap saat dihover */
}

/* Gaya CSS untuk daftar kegiatan */
.activities-list {
  width: 100%;
  max-width: 600px; /* Lebarkan daftar kegiatan */
  padding: 0;
  list-style-type: none;
}

.activities-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white; /* Warna latar belakang pink */
  padding: 16px;
  margin-bottom: 20px; /* Berikan margin bawah yang lebih besar */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.activities-list li button {
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #ff416c; /* Warna tombol merah muda */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
} .activities-list li .completed {
  text-decoration: line-through;
  color: #888;
}
</style>