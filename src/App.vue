<template lang="pug">
    div#app
      Catalog
    </template>

<script>
import Catalog from "./components/Catalog.vue";

export default {
  components: {
    Catalog,
  },
};
</script>

<style>
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  src: url("./assets/fonts/Inter_Light.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  src: url("./assets/fonts/Inter_Regular.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  src: url("./assets/fonts/Inter_Medium.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  src: url("./assets/fonts/Inter_SemiBold.woff2") format("woff2");
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: "Inter", sans-serif;
  margin: 0;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
