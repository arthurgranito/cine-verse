import Filmes from "@/components/Filmes/Filmes.vue";
import Series from "@/components/Séries/Series.vue";
import Busca from "@/components/Busca/Busca.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "filmes",
      component: Filmes,
    },
    {
      path: "/series",
      name: "series",
      component: Series,
    },
    {
      path: '/busca/:busca',
      name: 'busca',
      component: Busca
    }
  ],
});

export default router;
