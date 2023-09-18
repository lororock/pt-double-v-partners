<script setup>
import { ref } from "vue";

const posterRef = ref(null);

const { isModalOpen, selectedMovie, getGenres, closeModal } = defineProps([
  "isModalOpen",
  "selectedMovie",
  "getGenres",
  "closeModal",
]);

const handleMouseMove = (evt) => {
  const el = posterRef.value;
  if (el) {
    const { clientWidth: width, clientHeight: height } = el;
    const { layerX, layerY } = evt;
    const yRotation = ((layerX - width / 2) / width) * 20;
    const xRotation = ((layerY - height / 2) / height) * 20;
    const transformString = `
          perspective(500px)  
          scale(1.1)
          rotateX(${xRotation}deg)
          rotateY(${yRotation}deg)
        `;

    el.style.transform = transformString;
  }
};

const handleMouseOut = () => {
  const el = posterRef.value;
  if (el) {
    el.style.transform = `
          perspective(500px)
          scale(1)
          rotateX(0deg)
          rotateY(0deg)
        `;
  }
};
</script>

<template>
  <div
    class="modal-content"
    ref="posterRef"
    @mousemove="handleMouseMove"
    @mouseout="handleMouseOut"
  >
    <span @click="closeModal()" class="close">&times;</span>
    <div class="modal-content__data">
      <div class="modal-content__left">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + selectedMovie.poster_path"
          class="movie-card__img"
        />
        <img
          :src="'https://image.tmdb.org/t/p/w500' + selectedMovie.backdrop_path"
          class="movie-card__img2"
        />
      </div>
      <div class="modal-content__right">
        <div class="content-right__top">
          <div class="content-right__info">
            <h2>
              {{ selectedMovie ? selectedMovie.original_title : "no funciono" }}
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
</template>
