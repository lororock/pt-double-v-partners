<script setup>
import { ref, onMounted } from "vue";
import { getMovie, getMovies, getGenders } from "../services/getData.js";

defineProps({
  msg: String,
});

const movieData = ref(null);
const moviesData = ref(null);
const genders = ref(null);

onMounted(async () => {
  try {
    movieData.value = await getMovie();
    moviesData.value = await getMovies();
    genders.value = await getGenders();
  } catch (error) {
    console.error("Error al obtener los datos de la película:", error);
  }
});

const getGenres = (genreIds) => {
  const genres = genreIds.map((genreId) => {
    const genre = genders.value && genders.value.genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : "";
  });
  return genres.join(", ");
};
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="card">
      <!-- Verifica si moviesData y moviesData.results no son nulos o indefinidos -->
      <div v-if="moviesData && moviesData.results">
        <!-- Contenido que se mostrará si moviesData.results existe -->
        <div class="movie-card-container">
          <div class="movie-card" v-for="movie in moviesData.results" :key="movie.id">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              :alt="movie.original_title"
              class="movie-card__img"
            />
            <div class="movie-card__body">
              <h2 class="movie-card__title">{{ movie.original_title }}</h2>
              <h5>Idioma {{ getGenres(movie.genre_ids) }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- Contenido que se mostrará si moviesData.results es nulo o indefinido -->
        <p>No se encontraron resultados de películas.</p>
      </div>
    </div>
  </div>
</template>
