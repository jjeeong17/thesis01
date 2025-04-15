<template>
  <section class="intro-section">
    <div class="intro-layout">
      <!-- 왼쪽 캐비넷 -->
      <div class="cabinet-wrapper">
        <img :src="emptyCabinet" class="cabinet-left" />
        <transition name="fade-drop">
          <img v-if="showMeds" :src="filledCabinet" class="meds-left" />
        </transition>
      </div>

      <!-- 타이틀 -->
      <h1 class="title">
        <span :class="{ activeBlue: showMeds }">Safe</span><br />
        Alone,<br />
        <span :class="{ activeRed: showMeds }">Risky</span><br />
        Together
      </h1>

      <!-- 오른쪽 캐비넷 -->
      <div class="cabinet-wrapper">
        <img :src="emptyCabinet" class="cabinet-right" />
        <transition name="fade-drop">
          <img v-if="showMeds" :src="filledCabinet" class="meds-right" />
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import emptyCabinet from "@/assets/empty-cabinet.svg";
import filledCabinet from "@/assets/filled-cabinet.png";

export default {
  name: "IntroSection",
  data() {
    return {
      showMeds: false,
      emptyCabinet,
      filledCabinet,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showMeds = true;
    }, 1500);
  },
};
</script>

<style scoped>
.intro-section {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.intro-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

.cabinet-wrapper {
  position: relative;
  width: 500px; /* 각 캐비넷 wrapper 기본 크기 */
  height: 300px;
}

/* 👇 왼쪽 캐비넷 */
.cabinet-left {
  position: absolute;
  width: 100%;
  top: -40%;
  left: -35%;
  z-index: 1;
}

/* 👇 왼쪽 약 */
.meds-left {
  position: absolute;
  width: 80%;
  top: -26%;
  left: -23%;
  z-index: 2;
}

/* 👇 오른쪽 캐비넷 */
.cabinet-right {
  position: absolute;
  width: 100%;
  top: -40%;
  left: 35%;
  z-index: 1;
}

/* 👇 오른쪽 약 */
.meds-right {
  position: absolute;
  width: 80%;
  top: -26%;
  left: 47%;
  z-index: 2;
}

/* 텍스트 스타일 */
.title {
  font-size: 3rem;
  font-weight: 500;
  color: #aaa;
  text-align: center;
  transition: all 0.6s ease;
  line-height: 1.2;
}

.activeBlue {
  background-color: #1e67b0;
  color: white;
  padding: 1.6px 5px;
  display: inline-block;
  transition: all 0.5s ease;
}

.activeRed {
  background-color: #c33131;
  color: white;
  padding: 1.6px 5px;
  display: inline-block;
  transition: all 0.5s ease;
}

/* 애니메이션 */
.fade-drop-enter-active {
  animation: dropFade 1s ease-out forwards;
}

@keyframes dropFade {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
