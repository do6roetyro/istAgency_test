<template lang="pug">
    a.navigation__link(href="#") {{ name }}
    </template>
    
    <script>
    export default {
      props: {
        name: {
          type: String,
          required: true
        }
      }
    };
    </script>
    