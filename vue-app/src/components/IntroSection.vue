<template>
  <section class="intro-section" id="intro">
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
import filledCabinet from "@/assets/filled-cabinet.svg";

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
  width: 500px;
  height: 300px;
}

/* 왼쪽 캐비넷 */
.cabinet-left {
  position: absolute;
  width: 100%;
  top: -60%;
  left: -35%;
  z-index: 1;
}

/* 오른쪽 캐비넷 */
.cabinet-right {
  position: absolute;
  width: 100%;
  top: -60%;
  left: 35%;
  z-index: 1;
}

/* 약 이미지 (깜빡이지 않음) */
.meds-left {
  position: absolute;
  width: 83%;
  top: -20%;
  left: -27%;
  z-index: 2;
  opacity: 1;
}

.meds-right {
  position: absolute;
  width: 83%;
  top: -20%;
  left: 43%;
  z-index: 2;
  opacity: 1;
}

.title {
  font-family: "kigelia-lgc", sans-serif;
  font-size: 70px;
  font-weight: 700;
  color: white; /* 폰트 색상 */
  text-align: center;
  line-height: 1.4;
  letter-spacing: 1.4px;
  transition: all 0.6s ease;

  /* 텍스트 테두리 (stroke 효과) */
  -webkit-text-stroke: 1px black; /* Chrome/Safari용 */
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black; /* Firefox 대응용 */
}

/* Safe / Risky 글씨는 항상 보이고, 배경만 깜빡이게 처리 */

.activeBlue {
  background-color: #4f7ebb;
  animation: blinkBackgroundBlue 2.5s steps(1, end) infinite;
}

.activeRed {
  background-color: #c33131;
  animation: blinkBackgroundRed 2.5s steps(1, end) infinite;
}

/* 배경만 깜빡이도록 하는 애니메이션 */
@keyframes blinkBackgroundBlue {
  0%,
  100% {
    background-color: #4f7ebb;
  }
  50% {
    background-color: transparent;
  }
}

@keyframes blinkBackgroundRed {
  0%,
  100% {
    background-color: #c33131;
  }
  50% {
    background-color: transparent;
  }
}

/* 캐비넷 드롭 등장 효과 */
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
