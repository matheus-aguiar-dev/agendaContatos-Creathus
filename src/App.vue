<template>
  <div>
    <Contatos />
  </div>
</template>

<script>
import Contatos from "./components/Contatos.vue";

export default {
  name: "App",
  components: {
    Contatos,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
