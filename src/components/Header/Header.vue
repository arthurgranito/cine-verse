<template>
  <header>
    <RouterLink class="menu-link" :to="{ name: 'filmes' }">
      <h1 style="color: #d4d4d8">CineVerse</h1>
    </RouterLink>
    <Button
      icon="pi pi-bars"
      severity="secondary"
      outlined
      @click="visible = true"
      class="menu-btn-mobile"
    />

    <Drawer
      v-model:visible="visible"
      header="CineVerse"
      position="right"
      style="width: 70vw"
    >
      <div class="menu">
        <form @submit.prevent="buscar">
          <InputGroup>
            <InputText placeholder="Buscar título" v-model="busca" />
            <InputGroupAddon>
              <button
                style="
                  cursor: pointer;
                  border: none;
                  outline: none;
                  background-color: transparent;
                "
                type="submit"
              >
                <i class="pi pi-search"></i>
              </button>
            </InputGroupAddon>
          </InputGroup>
        </form>
        <ul>
          <RouterLink
            :to="{ name: 'filmes' }"
            class="menu-link"
            @click="visible = false"
          >
            <Button
              icon="pi pi-video"
              label="Filmes"
              severity="secondary"
              style="width: 100%; cursor: pointer"
            />
          </RouterLink>
          <RouterLink
            :to="{ name: 'series' }"
            class="menu-link"
            @click="visible = false"
          >
            <Button
              icon="pi pi-images"
              label="Séries"
              severity="secondary"
              style="width: 100%; cursor: pointer"
            />
          </RouterLink>
          <div class="social">
            <a
              target="_blank"
              href="https://github.com/arthurgranito"
              style="width: 100%"
            >
              <Button
                icon="pi pi-github"
                severity="secondary"
                outlined
                style="width: 100%"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/arthurgranito"
              style="width: 100%;"
            >
              <Button
                icon="pi pi-linkedin"
                severity="secondary"
                outlined
                style="width: 100%;"
              />
            </a>
          </div>
        </ul>
      </div>
    </Drawer>

    <div class="menu-pc">
      <ul>
        <a target="_blank" href="https://github.com/arthurgranito">
          <Button icon="pi pi-github" severity="secondary" outlined />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/arthurgranito">
          <Button icon="pi pi-linkedin" severity="secondary" outlined />
        </a>
        <RouterLink
          :to="{ name: 'filmes' }"
          class="menu-link"
          @click="visible = false"
        >
          <Button
            icon="pi pi-video"
            label="Filmes"
            severity="secondary"
            style="width: 90px; cursor: pointer"
          />
        </RouterLink>
        <RouterLink
          :to="{ name: 'series' }"
          class="menu-link"
          @click="visible = false"
        >
          <Button
            icon="pi pi-images"
            label="Séries"
            severity="secondary"
            style="width: 90px; cursor: pointer"
          />
        </RouterLink>
      </ul>
      <form @submit.prevent="buscar">
        <InputGroup>
          <InputText
            placeholder="Buscar título"
            v-model="busca"
            style="width: 200px"
          />
          <InputGroupAddon>
            <button
              style="
                cursor: pointer;
                border: none;
                outline: none;
                background-color: transparent;
              "
              type="submit"
            >
              <i class="pi pi-search"></i>
            </button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  </header>
</template>

<script setup>
import Drawer from "primevue/drawer";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const visible = ref(false);
const busca = ref("");

const buscar = () => {
  if (busca.value == "") {
    return;
  } else {
    router.push(`/busca/${busca.value}`);
    visible.value = false;
    busca.value = "";
  }
};
</script>

<style scoped>
header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.menu ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.menu ul li {
  display: flex;
  align-items: center;
  font-weight: 600;
  width: 100%;
  gap: 5px;
}
.menu-link {
  color: white;
  text-decoration: none;
}
.menu-pc {
  display: none;
}
.social{
  display: flex;
  gap: 10px;
}
@media (min-width: 768px) {
  .menu-btn-mobile {
    display: none;
  }
  .menu-pc {
    display: flex;
    gap: 10px;
  }

  .menu-pc ul {
    display: flex;
    gap: 10px;
  }
}
@media (min-width: 1024px) {
  .menu-pc {
    gap: 20px;
  }
  .menu-pc ul {
    gap: 20px;
  }
}
</style>
