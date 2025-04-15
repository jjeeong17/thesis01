<template>
  <section class="hook-section">
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
        <span class="highlight yellow">9</span> out of 10 Americans use OTC
        medicines.
      </p>
      <p>
        <span class="highlight red">8</span> out of 10 self-treat — no doctor
        involved.
      </p>
      <p>
        <span class="but">BUT,</span> many meds contain the same ingredients.
      </p>
      <p>
        Taking too much can lead to <span class="highlight red">overdose</span>.
      </p>
      <p>
        <span class="question"
          >Do you ever read the
          <span class="underline">Drug Facts label</span>?</span
        >
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
      const left = spacing * index + Math.random() * (spacing - 5); // 각 영역 안에서 약간의 무작위
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
  border: 1px solid #aaa;
  padding: 30px 40px;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 400;
  color: #333;
}

/* 강조 텍스트 스타일 */
.highlight {
  font-size: 40px;
  color: #f4b400;
  font-weight: bold;
}

.highlight.red {
  color: #c33131;
}

.outline {
  font-weight: bold;
  -webkit-text-stroke: 1px #000;
  color: white;
}

.but {
  color: #c33131;
  font-weight: bold;
  margin-right: 5px;
}
</style>
