<template lang="pug">
  button.header__burger(:class="{ 'is-active': isDropdown }" @click="toggleDropdown")
    span.visually-hidden Меню
    .burger
      span.burger__line
      span.burger__line
      span.burger__line
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    isDropdown: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggle-dropdown"],
  setup(props, { emit }) {
    const { isDropdown } = toRefs(props);

    const toggleDropdown = () => {
      emit("toggle-dropdown");
    };

    return {
      isDropdown,
      toggleDropdown,
    };
  },
});
</script>

<style lang="scss" scoped>
.burger {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .burger__line {
    width: 24px;
    height: 2px;
    background-color: #000;
    transition: 0.3s ease;
  }
}

.header__burger {
  background: none;
  border: none;
  cursor: pointer;

  &.is-active .burger {
    .burger__line {
      &:nth-child(1) {
        transform: rotate(45deg) translate(2px, 5px);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(3px, -7px);
      }
    }
  }
}
</style>
