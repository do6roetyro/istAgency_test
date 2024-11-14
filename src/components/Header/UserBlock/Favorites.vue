<template lang="pug">
    a.favourites__link(href="#")
        span.visually-hidden Избранное
        svg.favourites__icon(width="24" height="24")
            use(xlink:href="#icon-heart")
    </template>

<script></script>

<style lang="scss" scoped>

.favourites__icon {
  width: clamp(16px, 2vw, 24px);
  height: clamp(16px, 2vw, 24px);
}
</style>