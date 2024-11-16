<template lang="pug">
    .toggle(@click="toggle")
      input.toggle__checkbox(
        type="checkbox"
        :checked="checked"
        @change="onChange"
      )
      .toggle__switch
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";

export default defineComponent({
  name: "ToggleSwitch",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const checked = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const toggle = () => {
      checked.value = !checked.value;
    };

    const onChange = (event) => {
      checked.value = event.target.checked;
    };

    return {
      checked,
      toggle,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.toggle {
  position: relative;
  width: 36px;
  height: 24px;
  cursor: pointer;
}

.toggle__checkbox {
  display: none;
}

.toggle__switch {
  height: 22px;
  background-color: #f2f2f2;
  border-radius: 12px;
  position: relative;
  transition: background-color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: rgba(31, 32, 32, 1);
    border-radius: 50%;
    transition: left 0.3s ease;
  }
}

.toggle__checkbox:checked + .toggle__switch::after {
  left: 22px;
}

.toggle__checkbox:checked + .toggle__switch {
  background-color: rgba(123, 184, 153, 1);
}
</style>
