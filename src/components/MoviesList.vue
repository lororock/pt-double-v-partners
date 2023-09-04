<script setup>
import { ref, onMounted } from "vue";
import { getMovies, getGenders } from "../services/getData.js";
import Modal from "./Modal.vue";

const moviesData = ref(null);
const genders = ref(null);
const isModalOpen = ref(false);
const selectedMovie = ref(null);

onMounted(async () => {
  try {
    moviesData.value = await getMovies();
    genders.value = await getGenders();
  } catch (error) {
    console.error("Error al obtener los datos de la película:", error);
  }
});

const openModal = (movie) => {
  selectedMovie.value = movie;
  isModalOpen.value = true;
  console.log("click", selectedMovie.value.backdrop_path);
};
const closeModal = () => {
  isModalOpen.value = false;
  console.log("click", isModalOpen.value);
};

const getGenres = (genreIds) => {
  const genres = genreIds.map((genreId) => {
    const genre =
      genders.value &&
      genders.value.genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : "";
  });
  return genres.join(", ");
};
</script>

<template>
  <div>
    <div class="card">
      <!-- Verifica si moviesData y moviesData.results no son nulos o indefinidos -->
      <div v-if="moviesData && moviesData.results">
        <!-- Contenido que se mostrará si moviesData.results existe -->
        <div class="movie-card-container">
          <div
            class="movie-card"
            v-for="movie in moviesData.results"
            :key="movie.id"
          >
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              :alt="movie.original_title"
              class="movie-card__img"
              @click="openModal(movie)"
            />
            <div>
              <div class="movie-card__body">
                <h2 class="movie-card__title">{{ movie.original_title }}</h2>
                <h5>{{ getGenres(movie.genre_ids) }}</h5>
                <h4>❤️ {{ movie.vote_average }}</h4>
              </div>
              <div class="movie-card__title__label">
                <b class="label-icon">+</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- Contenido que se mostrará si moviesData.results es nulo o indefinido -->
        <p>No se encontraron resultados de películas.</p>
      </div>
      <div class="modal" v-if="isModalOpen">
        <Modal
          :isModalOpen="isModalOpen"
          :selectedMovie="selectedMovie"
          :getGenres="getGenres"
          :closeModal="closeModal"
        />
      </div>
    </div>
  </div>
</template>