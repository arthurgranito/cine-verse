<template>
  <h3>
    Pesquisa por: <span>{{ data.busca }}</span>
  </h3>
  <p>
    Resultados encontrados:
    <span style="color: #d4d4d8">{{
      data.filmes.length + data.series.length
    }}</span>
  </p>

  <div
    style="
      width: 100%;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <SelectButton
      v-model="data.opcaoSelecionada"
      :options="data.options"
      v-if="!data.filmes.length == 0 && !data.series.length == 0"
    />
  </div>

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
      v-if="
        data.opcaoSelecionada == 'Todos' || data.opcaoSelecionada == 'Filmes'
      "
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
          <Button label="Ver detalhes" style="width: 100%" />
        </RouterLink>
      </template>
    </Card>

    <Card
      style="
        width: 250px;
        overflow: hidden;
        height: 576px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
      v-for="serie in data.series"
      v-if="
        data.opcaoSelecionada == 'Todos' || data.opcaoSelecionada == 'Séries'
      "
    >
      <template #header>
        <img
          :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`"
          alt="Foto"
          style="max-width: 100%; border-radius: 10px 10px 0 0; height: 375px"
        />
      </template>
      <template #title>{{ serie.name }}</template>
      <template #subtitle>
        <i class="pi pi-star-fill"></i>
        {{ serie.vote_average.toFixed(1) }}
      </template>
      <template #footer>
        <RouterLink :to="`/detalheserie/${serie.id}`">
          <Button label="Ver detalhes" style="width: 100%" />
        </RouterLink>
      </template>
    </Card>
  </div>

  <div v-if="data.filmes.length == 0 && data.series.length == 0">
    <div class="lista">
      <div class="empty">
        <i class="pi pi-search"></i>
        <h4 style="max-width: 200px; text-align: center">
          Nenhum título encontrado
        </h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import Card from "primevue/card";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import { onMounted, reactive, watch } from "vue";

const route = useRoute();
const data = reactive({
  apiKey: "49b16f807a3f235aa5a7ebe907022a77",
  isLoading: false,
  filmes: [],
  series: [],
  busca: route.params.busca,
  options: ["Todos", "Filmes", "Séries"],
  opcaoSelecionada: "Todos",
  valorFiltro: "",
});

const buscarFilmes = (busca) => {
  data.isLoading = true;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${data.apiKey}&query=${busca}&language=pt-BR`
  )
    .then((response) => response.json())
    .then((filmesAchados) => {
      data.filmes = filmesAchados.results;
      console.log(filmesAchados);
    });
};

const buscarSeries = (busca) => {
  fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${data.apiKey}&query=${busca}&language=pt-BR`
  )
    .then((response) => response.json())
    .then((seriesAchadas) => {
      data.series = seriesAchadas.results;
      console.log(seriesAchadas);
    })
    .finally(() => {
      data.isLoading = false;
    });
};

const buscarResultados = () => {
  buscarFilmes(data.busca);
  buscarSeries(data.busca);
};

onMounted(() => {
  buscarResultados();
});

watch(
  () => route.params.busca,
  (novaBusca) => {
    data.busca = novaBusca;
    buscarFilmes(novaBusca);
    buscarSeries(novaBusca);
  }
);
</script>

<style scoped>
h3 {
  text-align: center;
}
h3 span {
  text-transform: capitalize;
}
p {
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
.lista {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 250px);
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pi-search {
  font-size: 1.5rem;
  margin-bottom: 10px;
}
@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
