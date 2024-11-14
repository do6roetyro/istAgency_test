<template lang="pug">
    div.contact-info
      span.contact-info__description +7 (495) 221-77-69
      a.contact-info__link(href="tel:+74952217769") Заказать звонок
    </template>

<script></script>

<style lang="scss" scoped>
.contact-info__description {
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #1F2020;
  display: block;
}

.contact-info__link {
  line-height: 14px;
  opacity: 0.3;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
}
</style>
