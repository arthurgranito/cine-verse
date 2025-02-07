<template>
  <div class="loading" v-if="isLoading">
    <ProgressSpinner
      style="width: 50px; height: 50px; stroke-width: 8; fill: transparent"
      animation-duration=".5s"
      aria-label="Loading"
    />
  </div>

  <div class="container">
    <form @submit.prevent="entrar">
      <Card>
        <template #title>Entrar</template>
        <template #subtitle>Entre com seu email</template>
        <template #content>
          <div style="display: flex; flex-direction: column; gap: 20px">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText placeholder="Seu email" v-model="formData.email" />
            </InputGroup>

            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <Password
                placeholder="Sua senha"
                :feedback="false"
                v-model="formData.senha"
              />
            </InputGroup>
          </div>
          <p
            style="
              margin-top: 10px;
              font-size: 12px;
              color: rgb(214, 85, 85);
              text-align: center;
            "
          >
            {{ erro }}
          </p>
        </template>
        <template #footer>
          <Button
            label="Entrar"
            style="margin: 10px 0; width: 100%"
            type="submit"
          />
          <p style="text-align: center; color: #d4d4d8">
            Não possui uma conta?
            <RouterLink to="/registro">Cadastrar</RouterLink>
          </p>
        </template>
      </Card>
    </form>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import { reactive, ref } from "vue";
import { AUTH, signInWithEmailAndPassword } from "@/firebase/config";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoading = ref(false);
const formData = reactive({
  email: "",
  senha: "",
});
const erro = ref("");

const entrar = async () => {
  isLoading.value = true;
  erro.value = "";
  try {
    await signInWithEmailAndPassword(AUTH, formData.email, formData.senha);
    isLoading.value = false;
    router.push("/");
  } catch (err) {
    isLoading.value = false;
    erro.value = "Usuário ou senha incorretos. Tente novamente mais tarde";
  }
};
</script>

<style scoped>
.container {
  height: 70vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
