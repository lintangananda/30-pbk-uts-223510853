<template>
  <h2>Albums</h2>
  <div class="albums">
    <div class="column">
      <ul>
        <li v-for="(album, index) in leftColumnAlbums" :key="album.id" class="album-item" @click="goToAlbumDetail(album.id)">
          <span class="album-index">{{ index + 1 }}.</span> 
          <span class="album-title">{{ album.title }}</span> 
        </li>
      </ul>
    </div>
    <div class="column">
      <ul>
        <li v-for="(album, index) in rightColumnAlbums" :key="album.id" class="album-item" @click="goToAlbumDetail(album.id)">
          <span class="album-index">{{ index + 51 }}.</span> 
          <span class="album-title">{{ album.title }}</span> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore';
import { useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';

const postStore = usePostStore();
const router = useRouter();

onMounted(() => {
  postStore.fetchAllAlbums();
});

const albums = computed(() => postStore.albums);

// Split albums into left and right columns
const leftColumnAlbums = computed(() => albums.value.slice(0, 50));
const rightColumnAlbums = computed(() => albums.value.slice(50, 100));

const goToAlbumDetail = (albumId) => {
  router.push({ name: 'AlbumDetail', params: { albumId: String(albumId) } });
};
</script>

<style scoped>
.albums {
  display: flex;
  justify-content: space-between; /* Space out columns evenly */
  gap: 30px; /* Increase space between columns */
  padding: 20px; /* Add padding around the container */
  
}

h2 {
  font-family: Georgia, serif;
  color: #ff69b4; /* Change to a bright tomato color */
  text-align: left; /* Align text to the left */
  margin-bottom: 30px; /* Increase bottom margin */
  font-weight: 700; /* Bold font weight */
  text-align: center;
}

.column {
  background: #ff69b4; /* Light cyan background */
  padding: 25px; /* Increase padding */
  border-radius: 12px; /* Increase border radius */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Darker and larger shadow */
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0; /* Reset default margin */
}

.album-item {
  cursor: pointer;
  margin: 12px 0; /* Increase vertical margin */
  padding: 20px; /* Increase padding */
  border: 1px solid #fd06af; /* Light cyan border */
  border-radius: 12px; /* Increase border radius */
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, background-color 0.3s ease; /* Add transform transition */
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(180, 18, 18, 0.15); /* Adjust shadow */
}

.album-item:hover {
  background-color: #fd5ac4; /* Change hover background color */
  transform: scale(1.02); /* Slightly enlarge on hover */
}

.album-index {
  margin-right: 15px; /* Increase margin */
  font-weight: 700; /* Bold font weight */
  color: #fa22b6; /* Dark teal color */
}

.album-title {
  flex: 1;
  font-size: 1.2em; /* Increase font size */
  color: #030a0a; /* Darker teal color */
}
</style>
