<template lang="pug">
    a.logo__link(href="index.html")
        span.visually-hidden вернуться на главную
        svg.logo__icon(width="131" height="26")
            use(xlink:href="#icon-logo")
    </template>

<script></script>

<style lang="scss" scoped>
.logo__link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo__icon {
  width: clamp(99px, 10vw, 131px);
  height: clamp(21px, 10vw, 26px);
}
</style>
