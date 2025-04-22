<template>
  <section class="end-section" id="end">
    <h2 class="title">
      Check the ingredients,<br />
      not just the brand
    </h2>

    <div class="facts-wrapper">
      <!-- 병 이미지 -->
      <img
        src="@/assets/facts.svg"
        alt="Drug Facts Bottle"
        class="facts-image"
      />

      <!-- 클릭 가능한 원 -->
      <div
        v-for="(point, index) in points"
        :key="'circle-' + index"
        class="click-circle"
        :class="{ active: point.active }"
        :style="{ top: point.y + 'px', left: point.x + 'px' }"
        @click="togglePoint(index)"
      ></div>

      <!-- 선 + 툴팁 -->
      <template
        v-for="(point, index) in activePoints"
        :key="'tooltip-' + index"
      >
        <!-- 사선 선 -->
        <div class="tooltip-line" :style="getLineStyle(point)"></div>

        <!-- 툴팁 -->
        <div
          class="tooltip"
          :class="{ 'tooltip-left': point.x < 500 }"
          :style="getTooltipStyle(point)"
        >
          <strong>{{ point.title }}</strong
          ><br />
          {{ point.text }}
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: "EndSection",
  data() {
    return {
      points: [
        {
          x: 240,
          y: 320,
          title: "Active Ingredient(s)",
          text: "The ingredient that makes the medicine work. Shows how much is in each dose.",
          active: false,
        },
        {
          x: 240,
          y: 365,
          title: "Use(s)",
          text: "What symptoms or conditions the medicine helps with.",
          active: false,
        },
        {
          x: 240,
          y: 410,
          title: "Warning(s)",
          text: "Who shouldn't take it, possible side effects, and when to talk to a doctor.",
          active: false,
        },
        {
          x: 240,
          y: 570,
          title: "Directions",
          text: "How much to take, how often, and for how long.",
          active: false,
        },
        {
          x: 730,
          y: 320,
          title: "Purpose(s)",
          text: "What kind of medicine it is (like pain reliever or allergy medicine).",
          active: false,
        },
      ],
    };
  },
  computed: {
    activePoints() {
      return this.points.filter((p) => p.active);
    },
  },
  methods: {
    togglePoint(index) {
      this.points[index].active = !this.points[index].active;
    },
    getTooltipStyle(point) {
      const isLeft = point.x < 500;
      const boxWidth = 240;
      const offset = isLeft ? -boxWidth - 180 : 50;
      return {
        top: point.y + 50 + "px", // 툴팁 더 아래로!
        left: point.x + offset + "px",
      };
    },
    getLineStyle(point) {
      const tooltipWidth = 240;
      const tooltipX =
        point.x < 500 ? point.x - tooltipWidth - 180 : point.x + 50;
      const tooltipY = point.y + 80; // 툴팁과 동일
      const circleX = point.x + 10; // 원 중심
      const circleY = point.y + 10;

      const dx = tooltipX + tooltipWidth / 2 - circleX;
      const dy = tooltipY - circleY;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      return {
        top: circleY + "px",
        left: circleX + "px",
        width: length + "px",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "left center",
      };
    },
  },
};
</script>

<style scoped>
.end-section {
  height: 100vh;
  background-color: #fefefe;
  padding: 60px 20px;
  text-align: center;
  scroll-snap-align: start;
  position: relative;
}

.title {
  font-size: 60px;
  margin-bottom: 5px;
  color: white;
  text-align: left;
  margin-left: 70px;
  font-family: "kigelia-lgc", sans-serif;
  -webkit-text-stroke: 1px black;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  position: absolute;
  top: 50px;
  left: 40px;
}

.facts-wrapper {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.facts-image {
  width: 500px;
  display: block;
  margin: 0 auto;
  margin-top: 95px;
}

.click-circle {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #cc0100;
  cursor: pointer;
  z-index: 5;
  transition: transform 0.2s, background-color 0.2s;
}

.click-circle:hover {
  transform: scale(1.1);
}

.click-circle.active {
  background-color: #cc0100;
  border-color: #cc0100;
}

.tooltip {
  position: absolute;
  background: white;
  border: 2px solid #cc0100;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 20px;
  font-family: "kigelia-lgc", sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  max-width: 350px;
  width: 350px;
  text-align: left;
  line-height: 1.5;
  z-index: 10;
}

.tooltip strong {
  font-size: 22px;
  font-weight: 800;
  display: block;
  margin-bottom: -10px; /* 💡 간격 조절! */
  font-family: "kigelia-lgc", sans-serif;
  line-height: 1; /* 선택적으로 더 조밀하게 */
}

.tooltip-line {
  position: absolute;
  height: 2px;
  background-color: #cc0100;
  z-index: 4;
}
</style>
