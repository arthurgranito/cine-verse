<template>
  <header>
    <RouterLink class="menu-link" :to="{ name: 'filmes' }">
      <h1>CineVerse</h1>
    </RouterLink>
    <Button
      icon="pi pi-bars"
      severity="secondary"
      outlined
      @click="visible = true"
    />

    <Drawer
      v-model:visible="visible"
      header="CineVerse"
      position="right"
      style="width: 70vw"
    >
      <div class="menu">
        <form>
          <InputGroup>
            <InputText placeholder="Buscar título" />
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
            <li>
              <i class="pi pi-video"></i>
              Filmes
            </li>
          </RouterLink>
          <RouterLink
            :to="{ name: 'series' }"
            class="menu-link"
            @click="visible = false"
          >
            <li>
              <i class="pi pi-images"></i>
              Séries
            </li>
          </RouterLink>
        </ul>

        <Button outlined label="Cadastrar" />
        <Button label="Entrar" />
      </div>
    </Drawer>
  </header>
</template>

<script setup>
import Drawer from "primevue/drawer";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import { ref } from "vue";

const visible = ref(false);
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
  align-items: center;
  justify-content: space-between;
}
.menu ul li {
  display: flex;
  align-items: center;
  font-weight: 600;
  gap: 5px;
}
.menu-link {
  color: white;
  text-decoration: none;
}
</style>
