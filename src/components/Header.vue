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
    hola mundo
  </div>
</template>
