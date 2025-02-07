<template>
  <div class="loading" v-if="isLoading">
    <ProgressSpinner
      style="width: 50px; height: 50px; stroke-width: 8; fill: transparent"
      animation-duration=".5s"
      aria-label="Loading"
    />
  </div>

  <Button icon="pi pi-arrow-left" label="Voltar" severity="secondary" style="margin-left: 20px;" @click="router.go(-1)"/>

  <div class="card">
    <Card style="width: 250px; overflow: hidden">
      <template #header>
        <img
          :src="`${detalhesFilme.poster}`"
          :alt="`${detalhesFilme.titulo}`"
          style="max-width: 100%; border-radius: 10px 10px 0 0"
        />
      </template>
      <template #title>{{ detalhesFilme.titulo }}</template>
      <template #subtitle>
        <div>
          <p>{{ generos.join(', ') }}</p>
        </div>
        <div>
          <i class="pi pi-star-fill"></i>
          {{ detalhesFilme.nota }}
        </div>
        <div>
          <i class="pi pi-calendar"></i>
          {{ detalhesFilme.dataLancamento }}
        </div>
        <div>
          <i class="pi pi-clock"></i>
          {{ detalhesFilme.duracao }} minutos
        </div>
      </template>
      <template #content>
        <p style="margin: 0;">
            {{ detalhesFilme.descricao }}
        </p>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from 'primevue/button'
import Card from "primevue/card";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const apiKey = ref("49b16f807a3f235aa5a7ebe907022a77");

const detalhesFilme = reactive({
  poster: "",
  titulo: "",
  dataLancamento: "",
  duracao: "",
  nota: "",
  descricao: "",
});

const generos = ref([]);

const buscarDetalhes = () => {
  isLoading.value = true;
  fetch(
    `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${apiKey.value}&language=pt-BR`
  )
    .then((response) => response.json())
    .then((filme) => {
      detalhesFilme.poster = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
      detalhesFilme.titulo = filme.title;
      detalhesFilme.dataLancamento = filme.release_date;
      detalhesFilme.duracao = filme.runtime;
      generos.value = filme.genres.map((genero) => genero.name);
      detalhesFilme.nota = filme.vote_average.toFixed(1);
      detalhesFilme.descricao = filme.overview;
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
</style>
