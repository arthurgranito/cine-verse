<template>
  <h1>Resultados para: {{ route.params.busca }}</h1>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
