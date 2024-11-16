<template lang="pug"> 
    a.search(href="#") 
        span.visually-hidden Поиск
        svg.search__icon(width="24" height="24")
            use(xlink:href="#icon-search")
    </template>

<script></script>


<style lang="scss" scoped>

.search__icon {
  width: clamp(16px, 2vw, 24px);
  height: clamp(16px, 2vw, 24px);
}
</style>