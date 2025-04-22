<template>
  <section class="hook-section" id="hook">
    <!-- 떨어지는 알약들 -->
    <div class="pills-wrapper">
      <img
        v-for="n in 30"
        :key="n"
        :src="pillImg"
        :style="randomStyle(n - 1)"
        class="pill"
      />
    </div>

    <!-- 중앙 텍스트 박스 -->
    <div class="hook-box">
      <p>
        <span class="highlight red">9</span>
        out of 10 Americans use OTC medicines.
      </p>
      <p>
        <span class="highlight red">8</span>
        out of 10 self-treat — without a doctor.
      </p>
      <p>
        <span class="highlight orange">WHY?</span> Because we believe OTC drugs
        are <strong>safe</strong>.
      </p>
      <p>
        <span class="but">BUT,</span> many meds contain the
        <span class="highlight orange">same</span> ingredient.
      </p>
      <p>
        Have you ever <span class="highlight yellow">checked</span> the
        <strong>Drug Facts</strong> label before taking one?
      </p>
    </div>
  </section>
</template>

<script>
import pillImg from "@/assets/pill.svg";

export default {
  name: "HookSection",
  data() {
    return {
      pillImg,
    };
  },
  methods: {
    randomStyle(index) {
      const spacing = 100 / 30;
      const left = spacing * index + Math.random() * (spacing - 5);
      const delay = Math.random() * 3;
      return {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        width: `36px`,
        height: `36px`,
      };
    },
  },
};
</script>

<style scoped>
.hook-section {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: white;
  scroll-snap-align: start;
  font-family: "kigelia-lgc", sans-serif;
}

.pills-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.pill {
  position: absolute;
  top: -10%;
  animation: fall 5s linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(120vh);
  }
}

.hook-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  max-width: 700px;
  background: white;
  border: 2px solid #aaa;
  padding: 30px 40px;
  border-radius: 16px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
  color: #333;
  line-height: 1.5;
}

/* 강조 텍스트 스타일 */
.highlight {
  font-weight: bold;
}

.highlight.red {
  color: #b22223;
  font-size: 2.7rem; /* 숫자 강조: 더 큼 */
}

.highlight.orange {
  color: #f28719;
  font-size: 1.9rem;
}

.highlight.yellow {
  color: #e9bc19;
  font-size: 1.9rem;
}

.but {
  font-weight: bold;
  color: #000;
}
</style>
