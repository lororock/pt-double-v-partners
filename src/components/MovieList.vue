<script setup>
import { ref, onMounted } from "vue";
import { getMovie, getMovies, getGenders } from "../services/getData.js";

defineProps({
  msg: String,
});

const movieData = ref(null);
const moviesData = ref(null);
const genders = ref(null);
const isModalOpen = ref(false);
const selectedMovie = ref(null);

onMounted(async () => {
  try {
    movieData.value = await getMovie();
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
    <h1>{{ msg }}</h1>
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
        <div class="modal-content">
          <span @click="closeModal()" class="close">&times;</span>
          <div class="modal-content__data">
            <div class="modal-content__left">
              <img
                :src="
                  'https://image.tmdb.org/t/p/w500' + selectedMovie.poster_path
                "
                class="movie-card__img"
              />
              <img
                :src="
                  'https://image.tmdb.org/t/p/w500' + selectedMovie.backdrop_path
                "
                class="movie-card__img2"
              />
            </div>
            <div class="modal-content__right">
              <div class="content-right__top">
                <div class="content-right__info">
                <h2>
                  {{
                    selectedMovie ? selectedMovie.original_title : "no funciono"
                  }}
                </h2>
                <div class="right-info__movie">
                  <b>{{ getGenres(selectedMovie.genre_ids) }}</b>
                  <div>
                    <p>{{ selectedMovie.adult ? "M18" : "PG-13" }}</p>
                    <p>{{ selectedMovie.release_date }}</p>
                  </div>
                </div>
                <div class="right-info__details">
                  <div>
                    <div class="detail">
                      ❤️ {{ selectedMovie.vote_average }}
                      <h3>rating</h3>
                    </div>
                  </div>
                  <div>
                    <div class="detail">
                      👎 {{ Math.floor(Math.random() * (100 - 40 + 1)) + 40 }}
                      <h3>score</h3>
                    </div>
                  </div>
                  <div>
                    <div class="detail">
                      🏆 {{ Math.floor(Math.random() * (20 - 3 + 1)) + 3 }}
                      <h3>awards</h3>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                {{ selectedMovie.overview }}
              </p>
              <p class="full-movie">FULL MOVIE PROFILE →</p>
              </div>
              
              <div class="btns">
                <div class="btnl">Watch Trailer ▶</div>
                <div class="btnr">To Wathclist ⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
