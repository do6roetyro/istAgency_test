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
      startX: 0, // начальная координата X при касании
      endX: 0, // конечная координата X при отпускании
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
    handleTouchStart(event) {
      this.startX = event.touches[0].clientX; // сохраняем начальную точку касания
    },
    handleTouchMove(event) {
      this.endX = event.touches[0].clientX; // обновляем текущую точку касания
    },
    handleTouchEnd() {
      const swipeDistance = this.startX - this.endX;
      if (swipeDistance > 50) {
        // свайп влево
        this.nextSlide();
      } else if (swipeDistance < -50) {
        // свайп вправо
        this.prevSlide();
      }
      // сброс значений после завершения свайпа
      this.startX = 0;
      this.endX = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
  @media (max-width: 769px) {
    overflow: visible;
    min-height: 64px;
  }
}

.hero__slider {
  display: flex;
  @media (max-width: 769px) {
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
  width: 472px;
}

.hero__title {
  font-size: 72px;
  font-weight: 400;
  line-height: 63.36px;
  letter-spacing: -0.02em;
  margin: 0;
  padding-bottom: 24px;
}

.hero__description {
  font-size: 16px;
  font-weight: 500;
  line-height: 20.8px;
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
  @media (max-width: 769px) {
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
    right: 54px;
  }

  &--prev {
    left: 54px;
  }
}

.hero__pagination {
  position: absolute;
  bottom: 39px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 1;
  padding: 13px 24px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  @media (max-width: 769px) {
    display: none;
  }
}

.hero__dot {
  width: 6px;
  height: 6px;
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
  top: 32px;
  left: 64px;

  @media (max-width: 769px) {
    position: relative;
    color: #1f2020;
    top: 16px;
    left: 3.3vw;
  }
}
</style>
