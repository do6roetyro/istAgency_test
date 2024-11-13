<template lang="pug">
  section.hero
    HeroBreadcrumbs.hero__breadcrumbs(:breadcrumbs="['Главная', 'Продукты', 'Краски']")
    div.hero__slider
      div.hero__slides(:style="{ transform: `translateX(-${currentSlide * 100}%)` }")
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
import { nextSlide, prevSlide, goToSlide } from "@/utilites/slider.js";
import HeroBreadcrumbs from "./HeroBreadcrumbs.vue";

export default {
  components: {
    HeroBreadcrumbs,
  },
  data() {
    return {
      currentSlide: 0,
      slides: [
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
      ],
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = nextSlide(this.currentSlide, this.slides.length);
    },
    prevSlide() {
      this.currentSlide = prevSlide(this.currentSlide, this.slides.length);
    },
    goToSlide(index) {
      this.currentSlide = goToSlide(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.hero__slider {
  display: flex;
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
}

.hero__title {
  font-size: 2em;
  margin: 0;
}

.hero__description {
  font-size: 1em;
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
}

.hero__button {
  background-color: transparent;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.hero__button--next {
  transform: rotate(180deg);
}

.hero__pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 1; /* Ensure pagination is above slides */
}

.hero__dot {
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth dot transition */
}

.hero__dot.active {
  background-color: #fff;
}
</style>
