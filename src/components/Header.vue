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
  <div>hola mundo</div>
</template>
