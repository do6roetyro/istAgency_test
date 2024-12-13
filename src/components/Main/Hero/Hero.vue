<template lang="pug">
  section.hero
    HeroBreadcrumbs.hero__breadcrumbs(:breadcrumbs="['Главная', 'Продукты', 'Краски']")
    div.hero__slider
      div.hero__slides(
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      )
        div.hero__slide(v-for="(slide, index) in slides" :key="index")
          img.hero__image(
            :src="slide.image" 
            :alt="slide.alt" 
            :width="slide.width" 
            :height="slide.height"
          )
          div.hero__text
            h2.hero__title {{ slide.title }}
            p.hero__description {{ slide.description }}
    div.hero__controls
      button.hero__button.hero__button--prev(@click="prevSlide")
        span.visually-hidden предыдущий слайд
        svg(width="20" height="40")
          use(xlink:href="#icon-slider_button")
      button.hero__button.hero__button--next(@click="nextSlide")
        span.visually-hidden следующий слайд
        svg(width="20" height="40")
          use(xlink:href="#icon-slider_button")
    div.hero__pagination
      span.hero__dot(v-for="(slide, index) in slides" 
                    :key="index" 
                    :class="{ 'active': index === currentSlide }"
                    @click="goToSlide(index)")
</template>

<script>
import { defineComponent, ref } from "vue";
import { nextSlide, prevSlide, goToSlide } from "@/utilites/slider.js";
import HeroBreadcrumbs from "./HeroBreadcrumbs.vue";

export default defineComponent({
  name: "Hero",
  components: {
    HeroBreadcrumbs,
  },
  setup() {
    const currentSlide = ref(0);

    const slides = [
      {
        image: require("@/assets/images/hero_slide.webp"),
        width: "1920",
        height: "560",
        alt: "Стена изумрудного цвета",
        title: "Краски",
        description:
          "Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!",
      },
      {
        image: require("@/assets/images/hero_slide.webp"),
        width: "1920",
        height: "560",
        alt: "Стена изумрудного цвета",
        title: "Обои",
        description: "Подчеркнут вашу индивидуальность.",
      },
      // другие слайды
    ];

    const startX = ref(0); // начальная координата X при касании
    const endX = ref(0); // конечная координата X при отпускании

    const nextSlideHandler = () => {
      currentSlide.value = nextSlide(currentSlide.value, slides.length);
    };

    const prevSlideHandler = () => {
      currentSlide.value = prevSlide(currentSlide.value, slides.length);
    };

    const goToSlideHandler = (index) => {
      currentSlide.value = goToSlide(index);
    };

    const handleTouchStart = (event) => {
      startX.value = event.touches[0].clientX; // сохраняем начальную точку касания
    };

    const handleTouchMove = (event) => {
      endX.value = event.touches[0].clientX; // обновляем текущую точку касания
    };

    const handleTouchEnd = () => {
      const swipeDistance = startX.value - endX.value;
      if (swipeDistance > 50) {
        // свайп влево
        nextSlideHandler();
      } else if (swipeDistance < -50) {
        // свайп вправо
        prevSlideHandler();
      }
      // сброс значений после завершения свайпа
      startX.value = 0;
      endX.value = 0;
    };

    return {
      currentSlide,
      slides,
      nextSlide: nextSlideHandler,
      prevSlide: prevSlideHandler,
      goToSlide: goToSlideHandler,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
  @media (max-width: $mobile-resolution) {
    overflow: visible;
    min-height: 64px;
  }
}

.hero__slider {
  display: flex;
  @media (max-width: $mobile-resolution) {
    display: none;
  }
}

.hero__slides {
  display: flex;
  transition: transform 0.8s ease-in-out;
}

.hero__slide {
  min-width: 100%;
  box-sizing: border-box;
  position: relative;
}

.hero__image {
  width: 100%;
  height: auto;
}

.hero__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  width: clamp(380px, 10vw, 472px);
}

.hero__title {
  font-size: 72px;
  font-size: 3.75vw;
  font-size: clamp(36px, 4vw, 72px);
  font-weight: 400;
  line-height: 3.3vw;
  letter-spacing: -0.02em;
  margin: 0;
  padding-bottom: 24px;
}

.hero__description {
  font-size: clamp(10px, 1.2vw, 16px);
  font-weight: 500;
  line-height: 21px;
  line-height: clamp(17px, 1.7vw, 21px);
  letter-spacing: 0.02em;
  text-wrap: initial;
  margin: 0;
}

.hero__controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  z-index: 1;
  @media (max-width: $mobile-resolution) {
    display: none;
  }
}

.hero__button {
  background-color: transparent;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;

  &--next {
    transform: rotate(180deg);
    right: 2.8vw;
  }

  &--prev {
    left: 2.8vw;
  }
}

.hero__pagination {
  position: absolute;
  bottom: 2vw;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.42vw;
  z-index: 1;
  padding: 0.7vw 1.25vw;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  @media (max-width: $mobile-resolution) {
    display: none;
  }
}

.hero__dot {
  width: 0.3vw;
  min-width: 4px;
  height: 0.3vw;
  min-height: 4px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.hero__dot.active {
  background-color: #fff;
}

.hero__breadcrumbs {
  position: absolute;
  top: 1.67vw;
  left: 3.33vw;

  @media (max-width: $mobile-resolution) {
    position: relative;
    color: $primary-color;
    top: 16px;
    left: 3.3vw;
  }
}
</style>
