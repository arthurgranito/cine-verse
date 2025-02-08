import Filmes from "@/components/Filmes/Filmes.vue";
import Series from "@/components/Séries/Series.vue";
import Busca from "@/components/Busca/Busca.vue";
import { createRouter, createWebHistory } from "vue-router";
import DetalhesFilmes from "@/components/Detalhes/DetalhesFilmes.vue";
import DetalhesSerie from "@/components/Detalhes/DetalhesSerie.vue";
import Register from "@/components/Register/Register.vue";
import Login from "@/components/Login/Login.vue";

import { AUTH } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

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
      path: "/busca/:busca",
      name: "busca",
      component: Busca,
    },
    {
      path: "/detalhefilme/:id",
      name: "detalhefilme",
      component: DetalhesFilmes,
    },
    {
      path: "/detalheserie/:id",
      name: "detalheserie",
      component: DetalhesSerie,
    },
    {
      path: "/registro",
      name: "registro",
      component: Register,
    },
    {
      path: "/entrar",
      name: "entrar",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  onAuthStateChanged(AUTH, (user) => {
    if (user && (to.path === "/registro" || to.path === "/entrar")) {
      next("/");
    } else {
      next();
    }
  });
});

export default router;
