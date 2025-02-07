<template>
  <div>
    <app-header />
    <RouterView />
    <app-footer style="position: absolute; bottom: 0;"/>
  </div>
</template>

<script setup></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
</style>
