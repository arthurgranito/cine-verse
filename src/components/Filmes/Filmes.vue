<template>
  <h2>Filmes</h2>

  <div class="loading" v-if="data.isLoading">
    <ProgressSpinner
      style="width: 50px; height: 50px; stroke-width: 8; fill: transparent"
      animation-duration=".5s"
      aria-label="Loading"
    />
  </div>

  <div class="cards">
    <Card
      style="
        width: 250px;
        overflow: hidden;
        min-height: 576px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
      v-for="filme in data.filmes"
    >
      <template #header>
        <img
          :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`"
          alt="Foto"
          style="max-width: 100%; border-radius: 10px 10px 0 0; height: 375px"
        />
      </template>
      <template #title>{{ filme.title }}</template>
      <template #subtitle>
        <i class="pi pi-star-fill"></i>
        {{ filme.vote_average.toFixed(1) }}
      </template>
      <template #footer>
        <RouterLink :to="`/detalhefilme/${filme.id}`">
          <Button label="Ver detalhes" style="width: 100%"/>
        </RouterLink>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import { onMounted, reactive } from "vue";

const data = reactive({
  apiKey: "49b16f807a3f235aa5a7ebe907022a77",
  filmes: [],
  isLoading: true,
});

const buscarFilmes = () => {
  data.isLoading = true;
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${data.apiKey}&language=pt-BR`
  )
    .then((response) => response.json())
    .then((filmesAchados) => {
      filmesAchados.results.forEach((filme) => {
        data.filmes.push(filme);
      });
    })
    .finally(() => {
      data.isLoading = false;
    });
};

onMounted(() => {
  buscarFilmes();
});
</script>

<style scoped>
h2 {
  text-align: center;
}
.cards {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  padding: 20px;
  gap: 20px;
}
.loading {
  background-color: #1c1b22;
  width: 100vw;
  min-height: 100vh;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px){
  .cards{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
