<template>
  <div class="photo-detail">
    <h2>Photos</h2>

    <!-- Daftar thumbnail foto -->
    <div class="album-detail">
      <div v-for="photo in photos" :key="photo.id" class="photo-card" @click="showFullSizePhoto(photo)">
        <img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-thumbnail">
      </div>
    </div>

    <!-- Overlay untuk foto ukuran penuh -->
    <div v-if="showFullPhoto" class="full-photo-overlay" @click="showFullSizePhoto(null)">
      <div class="full-photo-container">
        <img :src="fullPhotoUrl" :alt="selectedPhoto.title" class="full-size-photo">
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();

const albumId = Number(route.params.albumId);

// Menggunakan ref untuk photos
const photos = ref([]);
const showFullPhoto = ref(false);
const selectedPhoto = ref(null);
const fullPhotoUrl = ref('');

// Menjalankan fetchPhotos saat komponen dimuat
onMounted(() => {
  postStore.fetchPhotos(albumId).then(() => {
    photos.value = postStore.photos;
  });
});

// Menampilkan foto ukuran penuh saat thumbnail diklik
const showFullSizePhoto = (photo) => {
  if (photo) {
    selectedPhoto.value = photo;
    fullPhotoUrl.value = photo.url; // Menggunakan atribut `url` untuk foto ukuran penuh
    showFullPhoto.value = true;
  } else {
    showFullPhoto.value = false;
  }
};
</script>

<style scoped>
.photo-detail {
  padding: 20px;
}

h2 {
  font-family: Georgia, serif;
  font-weight: 600;
  color: #ff69b4;
  text-align: center;
  margin-bottom: 20px;
}

.album-detail {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 photos per row */
  gap: 10px; /* Space between photos */
  justify-content: center;
}

.photo-card {
  padding: 10px;
  cursor: pointer;
}

.photo-thumbnail {
  width: 100%;
  height: auto;
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, rotate 0.3s ease; /* Added rotate and box-shadow transitions */
}

.photo-card:hover .photo-thumbnail {
  transform: scale(1.1) rotate(5deg); /* Add rotation on hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Add shadow on hover */
}

/* Overlay untuk foto ukuran penuh */
.full-photo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8); /* Latar belakang gelap */
  z-index: 9999;
}

.full-photo-container {
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
}

.full-size-photo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
}
</style>
