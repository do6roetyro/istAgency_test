<template lang="pug">
    section.hero
      Swiper(v-if="isDesktop" navigation pagination)
        SwiperSlide(v-for="(slide, index) in slides" :key="index")
          img.hero__image(
            :src="slide.image" 
            :alt="slide.alt" 
            :width="slide.width" 
            :height="slide.height")
          div.hero__text
            h2.hero__title {{ slide.title }}
            p.hero__description {{ slide.description }}
  </template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isDesktop: window.innerWidth >= 768,
      slides: [
        {
          image: ("../../assets/images/hero_slide.webp"),
          width: "1920",
          height: "560",
          alt: "Стена изумрудного цвета",
          title: "Краски",
          description:
            "Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!",
        },
        {
          image: ("../../assets/images/hero_slide.webp"),
          width: "1920",
          height: "560",
          alt: "Стена изумрудного цвета",
          title: "Обои",
          description: "Подчеркнут вашу индивидуальность.",
        },
        {
          image: ("../../assets/images/hero_slide.webp"),
          width: "1920",
          height: "560",
          alt: "Стена изумрудного цвета",
          title: "Краски",
          description:
            "Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!",
        },
        {
          image: ("../../assets/images/hero_slide.webp"),
          width: "1920",
          height: "560",
          alt: "Стена изумрудного цвета",
          title: "Обои",
          description: "Подчеркнут вашу индивидуальность.",
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("resize", this.checkViewport);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkViewport);
  },
  methods: {
    checkViewport() {
      this.isDesktop = window.innerWidth >= 768;
    },
  },
};
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 400px;
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
</style>
