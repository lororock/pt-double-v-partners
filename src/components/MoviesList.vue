<script setup>
import { ref, onMounted } from "vue";
import { getMovies, getGenders } from "../services/getData.js";
import Modal from "./Modal.vue";

const moviesData = ref(null);
const genders = ref(null);
const isModalOpen = ref(false);
const selectedMovie = ref(null);
const moreLoading = ref(6);
const lengthMovies = ref(6);

onMounted(async () => {
  document.addEventListener("keydown", handleKeyDown);
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
};
const closeModal = () => {
  isModalOpen.value = false;
};

const handleKeyDown = (event) => {
  if (event.key === "Escape" && isModalOpen.value) {
    closeModal();
  }
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

const addMoviesList = () => {
  lengthMovies.value = moviesData.value.results.length;
  moreLoading.value = moreLoading.value + 6;
};
</script>

<template>
  <div>
    <div class="filters">
      <div class="filter-contain">
        <div class="filter-select">IN THEATERS</div>
        <div class="filter-statik">COMING SOON</div>
        <div class="filter-statik">CHARTS</div>
        <div class="filter-statik">TV SERIES</div>
        <div class="filter-statik">TRAILERS</div>
        <div class="filter-more">MORE ↓</div>
        <div class="filter-score">⭐ 179</div>
      </div>
      <div class="filter-ranking">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 50 50"
        >
          <path
            d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 100 100"
        >
          <circle cx="25" cy="25" r="5" fill="#000" />
          <circle cx="50" cy="25" r="5" fill="#000" />
          <circle cx="75" cy="25" r="5" fill="#000" />
          <circle cx="25" cy="50" r="5" fill="#000" />
          <circle cx="50" cy="50" r="5" fill="#000" />
          <circle cx="75" cy="50" r="5" fill="#000" />
          <circle cx="25" cy="75" r="5" fill="#000" />
          <circle cx="50" cy="75" r="5" fill="#000" />
          <circle cx="75" cy="75" r="5" fill="#000" />
        </svg>
        <input type="range" />
      </div>
    </div>
    <div class="card">
      <div v-if="moviesData && moviesData.results">
        <div class="movie-card-container">
          <div
            class="movie-card"
            v-for="movie in moviesData.results.slice(0, moreLoading)"
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
      <div class="spinner-container" v-else>
        <div class="spinner"></div>
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
    <div class="more-loading" v-if="moreLoading <= lengthMovies">
      <button @click="addMoviesList">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="2" fill="#fff" />
          <circle cx="5" cy="10" r="2" fill="#fff" />
          <circle cx="15" cy="10" r="2" fill="#fff" />
        </svg>
      </button>
    </div>
  </div>
</template>
