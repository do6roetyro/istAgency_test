<template lang="pug">
    div.contact-info
      span.contact-info__description +7 (495) 221-77-69
      a.contact-info__link(href="tel:+74952217769") Заказать звонок
    </template>

<script></script>

<style lang="scss" scoped>
.contact-info__description {
  font-size: clamp(10px, 1.2vw, 16px);
  font-weight: 500;
  line-height: clamp(10px, 1.2vw, 16px);
  letter-spacing: -0.02em;
  color: $primary-color;
  display: block;
}

.contact-info__link {
  font-size: clamp(10px, 1.2vw, 16px);
  line-height: 14px;
  opacity: 0.3;
  transition: opacity 0.15s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 1;
    }
  }
}
</style>
