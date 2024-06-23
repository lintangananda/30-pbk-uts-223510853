<template>
  <header class="navbar">
  <nav>
    <ul class="nav-links">
      <li><RouterLink to="/todos" class="nav-link">Todos</RouterLink></li>
      <li><RouterLink to="/post" class="nav-link">Post</RouterLink></li>
      <li><RouterLink to="/album" class="nav-link">Album</RouterLink></li>
    </ul>
  </nav>
</header>
<RouterView />

</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>

/* CSS untuk header */
header {
  font-family: 'Georgia';
  background-color: #ff69b4; 
  color: white; 
  padding: 20px;
  text-align: center;
  font-weight: 600;
  
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 200px;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

/* Efek hover */
nav ul li:hover {
  background-color: #ff0280; 
  border-radius: 10px;
}

.nav-link {
  color: aliceblue;
}
</style>
