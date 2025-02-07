<template>
    <div class="container">
      <form>
        <Card>
          <template #title>Entrar</template>
          <template #subtitle>Entre com seu email</template>
          <template #content>
            <div style="display: flex; flex-direction: column; gap: 20px">
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText placeholder="Seu email" />
              </InputGroup>
  
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-lock"></i>
                </InputGroupAddon>
                <Password placeholder="Sua senha" />
              </InputGroup>
            </div>
          </template>
          <template #footer>
            <Button label="Entrar" style="margin: 10px 0; width: 100%" />
            <p style="text-align: center; color: #d4d4d8">
              Não possui uma conta? <RouterLink to="/registro">Cadastrar</RouterLink>
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
  </script>
  
  <style scoped>
  .container{
    height: 70vh;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  