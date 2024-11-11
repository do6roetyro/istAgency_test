<template lang="pug">
    div#app
      Header
      Main
    </template>

<script>
import Header from "./components/Header/Header.vue";
import Main from "./components/Main/Main.vue";

export default {
  components: {
    Header,
    Main,
  },
};
</script>

