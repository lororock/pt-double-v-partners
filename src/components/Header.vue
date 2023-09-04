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
      <div class="header-navbar__logo">IMDb</div>
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
  <div class="header-navbar__responsive">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="0 0 128 128"
      >
        <path
          fill="#fff"
          d="M64 14A50 50 0 1 0 64 114A50 50 0 1 0 64 14Z"
        ></path>
        <path
          fill="#444b54"
          d="M64,117c-29.2,0-53-23.8-53-53s23.8-53,53-53s53,23.8,53,53S93.2,117,64,117z M64,17c-25.9,0-47,21.1-47,47s21.1,47,47,47s47-21.1,47-47S89.9,17,64,17z"
        ></path>
        <path
          fill="#444b54"
          d="M86.5 52h-45c-1.7 0-3-1.3-3-3s1.3-3 3-3h45c1.7 0 3 1.3 3 3S88.2 52 86.5 52zM86.5 67h-45c-1.7 0-3-1.3-3-3s1.3-3 3-3h45c1.7 0 3 1.3 3 3S88.2 67 86.5 67z"
        ></path>
        <g>
          <path
            fill="#444b54"
            d="M86.5,82h-45c-1.7,0-3-1.3-3-3s1.3-3,3-3h45c1.7,0,3,1.3,3,3S88.2,82,86.5,82z"
          ></path>
        </g>
      </svg>
    </div>
    <div>
      <div class="responsive-img">
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
  </div>
</template>
