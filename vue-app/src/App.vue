<template>
  <div class="scroll-container">
    <SectionNav :currentSection="currentSection" @navigate="scrollToSection" />

    <IntroSection ref="intro" @enter="setCurrent('intro')" />
    <HookSection ref="hook" @enter="setCurrent('hook')" />
    <CardSection ref="card" @enter="setCurrent('card')" />
    <HeatSection ref="heat" @enter="setCurrent('heat')" />
    <ComboSection ref="combo" @enter="setCurrent('combo')" />
    <MuchSection ref="much" @enter="setCurrent('much')" />
    <EndSection ref="end" @enter="setCurrent('end')" />
  </div>
</template>

<script>
import SectionNav from "./components/SectionNav.vue";
import IntroSection from "./components/IntroSection.vue";
import HookSection from "./components/HookSection.vue";
import CardSection from "./components/CardSection.vue";
import HeatSection from "./components/HeatSection.vue";
import ComboSection from "./components/ComboSection.vue";
import MuchSection from "./components/MuchSection.vue";
import EndSection from "./components/EndSection.vue";

export default {
  components: {
    SectionNav,
    IntroSection,
    HookSection,
    CardSection,
    ComboSection,
    HeatSection,
    MuchSection,
    EndSection,
  },
  data() {
    return {
      currentSection: "intro",
    };
  },
  methods: {
    setCurrent(sectionName) {
      console.log("✅ currentSection set to:", sectionName);
      this.currentSection = sectionName;
    },
    scrollToSection(sectionName) {
      this.$refs[sectionName]?.$el.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style>
.scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}
</style>
