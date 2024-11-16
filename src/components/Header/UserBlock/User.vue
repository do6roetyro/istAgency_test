<template lang="pug">
    a.user(href="#") 
        span.visually-hidden Профиль
        svg.user__icon(width="24" height="24")
            use(xlink:href="#icon-profile")
    </template>

<script></script>

<style lang="scss" scoped>

.user__icon {
  width: clamp(16px, 2vw, 24px);
  height: clamp(16px, 2vw, 24px);
}
</style>