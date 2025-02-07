<template>
  <div class="loading" v-if="isLoading">
    <ProgressSpinner
      style="width: 50px; height: 50px; stroke-width: 8; fill: transparent"
      animation-duration=".5s"
      aria-label="Loading"
    />
  </div>

  <Button
    icon="pi pi-arrow-left"
    label="Voltar"
    severity="secondary"
    style="margin-left: 20px"
    @click="router.go(-1)"
  />

  <div class="card">
    <Card style="width: 250px; overflow: hidden">
      <template #header>
        <img
          :src="`${detalhesSerie.poster}`"
          :alt="`${detalhesSerie.titulo}`"
          style="max-width: 100%; border-radius: 10px 10px 0 0"
        />
      </template>
      <template #title>{{ detalhesSerie.titulo }}</template>
      <template #subtitle>
        <div>
          <p>{{ generos.join(", ") }}</p>
        </div>
        <div>
          <i class="pi pi-star-fill"></i>
          {{ detalhesSerie.nota }}
        </div>
        <div>
          <i class="pi pi-calendar"></i>
          {{ detalhesSerie.dataEstreia }}
        </div>
        <div>
          <i class="pi pi-receipt"></i>
          {{ detalhesSerie.numeroTemporadas }} temporadas
        </div>
      </template>
      <template #content>
        <p style="margin: 0">
          {{ detalhesSerie.descricao }}
        </p>
      </template>
    </Card>
  </div>

  <div class="card-tablet-pc">
    <Card style="width: 100%; overflow: hidden; flex-direction: row;">
      <template #header>
        <img
          :src="`${detalhesSerie.poster}`"
          :alt="`${detalhesSerie.titulo}`"
          style="width: 450px; height: 100%;"
        />
      </template>
      <template #title>{{ detalhesSerie.titulo }}</template>
      <template #subtitle>
        <div>
          <p>{{ generos.join(", ") }}</p>
        </div>
        <div>
          <i class="pi pi-star-fill"></i>
          {{ detalhesSerie.nota }}
        </div>
        <div>
          <i class="pi pi-calendar"></i>
          {{ detalhesSerie.dataEstreia }}
        </div>
        <div>
          <i class="pi pi-receipt"></i>
          {{ detalhesSerie.numeroTemporadas }} temporadas
        </div>
      </template>
      <template #content>
        <p style="margin: 0">
          {{ detalhesSerie.descricao }}
        </p>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import ProgressSpinner from "primevue/progressspinner";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import { onMounted, reactive, ref } from "vue";

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const apiKey = ref("49b16f807a3f235aa5a7ebe907022a77");

const detalhesSerie = reactive({
  poster: "",
  titulo: "",
  dataEstreia: "",
  numeroTemporadas: "",
  nota: "",
  descricao: "",
});

const generos = ref([]);

const buscarDetalhes = () => {
  isLoading.value = true;
  fetch(
    `https://api.themoviedb.org/3/tv/${route.params.id}?api_key=${apiKey.value}&language=pt-BR`
  )
    .then((response) => response.json())
    .then((serie) => {
      detalhesSerie.poster = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
      detalhesSerie.titulo = serie.name;
      detalhesSerie.dataEstreia = serie.first_air_date;
      generos.value = serie.genres.map((genero) => genero.name);
      detalhesSerie.numeroTemporadas = serie.number_of_seasons;
      detalhesSerie.nota = serie.vote_average.toFixed(1);
      detalhesSerie.descricao = serie.overview;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  buscarDetalhes();
});
</script>

<style scoped>
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
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.card-tablet-pc{
  display: none;
}
@media (min-width: 768px) {
  .card {
    display: none;
  }
  .card-tablet-pc {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .card-container {
    display: flex;
    border-radius: 20px;
    gap: 20px;
  }
}
</style>
