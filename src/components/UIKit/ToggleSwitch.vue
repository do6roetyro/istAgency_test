<template lang="pug">
    .toggle(@click="toggle")
        input.toggle__checkbox(type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', !modelValue)")
            .toggle__switch
</template>

<script>
export default {
    name: "ToggleSwitch",
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        toggle() {
            this.$emit("update:modelValue", !this.modelValue);
        },
    },
};
</script>

<style lang="scss" scoped>
.toggle {
    position: relative;
    width: 65px;
    height: 24px;
    cursor: pointer;
}

.toggle__checkbox {
    display: none;
}

.toggle__switch {
    width: 36px;
    height: 22px;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 12px;
    position: relative;
    transition: background-color 0.3s ease;

    &::after {
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

.toggle__checkbox:checked+.toggle__switch::after {
    left: 22px;
}

.toggle__checkbox:checked+.toggle__switch {
    background-color: rgba(123, 184, 153, 1);
}
</style>