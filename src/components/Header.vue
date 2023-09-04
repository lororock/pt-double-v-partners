<script setup>
import { ref, onMounted } from "vue";
import { getMovie } from "../services/getData.js";

const movieData = ref(null);

onMounted(async () => {
  try {
    movieData.value = await getMovie();
  } catch (error) {
    console.error("Error al obtener los datos de la película:", error);
  }
});
</script>

<template>
  <div
    class="img-header"
    v-if="movieData"
    :style="{
      backgroundImage: `url('https://image.tmdb.org/t/p/original${movieData.backdrop_path}')`,
    }"
  >
    <div class="header-navbar">
      <div class="header-navbar__logo">IMD</div>
      <div class="header-navbar__data">
        <ul class="navbar-data__list">
          <li class="data-select">MOVIES</li>
          <li>CELEBS & PHOTOS</li>
          <li>COMMUNITY</li>
          <li>NEWS</li>
        </ul>
      </div>
      <div class="header-navbar__img">
        <a
          href="https://www.linkedin.com/in/cristhian-rosas-4395a5231/"
          target="_blank"
        >
          <img
            src="https://media.licdn.com/dms/image/D4E03AQFfJUhZncEUXA/profile-displayphoto-shrink_800_800/0/1681164482731?e=1699488000&v=beta&t=Zl0yQ4vLKv8O5QQjWd3Xmd_Eju85jAYQuRYxdO9mZ_k"
            alt="Cristhian Rosas"
        /></a>
      </div>
    </div>
    <div class="header-title">
      <h1>{{ movieData.original_title }}</h1>
      <div class="header-genre">
        <div v-for="genre of movieData.genres" :key="movieData.id">
          <h2>{{ genre.name }}</h2>
        </div>
      </div>
      <div>
        <h2 class="header-btn">Watch Trailer ▶️</h2>
      </div>

      <div class="header-info">
        <h3>{{ movieData.status }}</h3>
        <h2>{{ movieData.release_date }}({{ movieData.original_language }})</h2>
      </div>
    </div>
  </div>
</template>
