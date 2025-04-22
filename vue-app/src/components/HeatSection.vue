<template>
  <section class="heat-section" id="heat">
    <!-- 🔹 성분 리스트 -->
    <div class="ingredient-list">
      <div
        v-for="(cats, ing) in ingredientMap"
        :key="ing"
        :class="['ingredient-item', { active: selectedIngredient === ing }]"
        @click="selectIngredient(ing)"
        :style="{
          backgroundColor: ingredientListColorMap[ing],
          color: selectedIngredient === ing ? '#000' : '#333',
        }"
      >
        {{ ing }}
      </div>
    </div>

    <!-- 🔹 SVG 아크 다이어그램 -->
    <svg
      ref="svg"
      :width="width"
      :height="height"
      viewBox="0 0 2000 1000"
      preserveAspectRatio="xMidYMid meet"
    ></svg>

    <!-- 🔹 타이틀 -->
    <h1 class="title">One Ingredient, Many Uses</h1>

    <!-- 🔹 경고 메시지 -->
    <div v-if="currentWarning" class="warning-box">
      {{ currentWarning }}
    </div>
  </section>
</template>

<script>
import * as d3 from "d3";
import ingredientMap from "@/assets/data/arc_data.json";

export default {
  name: "ArcDiagram",
  data() {
    return {
      width: 1850,
      height: 1020,
      ingredientMap,
      selectedIngredient: Object.keys(ingredientMap)[0],
      currentWarning: null,
      categories: ["Allergy", "Arthritis", "Cough", "Fever", "Pain"],
      colors: [
        "#C71743",
        "#CB3653",
        "#E6495B",
        "#EC6A6A",
        "#F09173",
        "#F5B677",
        "#F9D88A",
        "#FCF7AB",
      ],
      warnings: {
        Acetaminophen:
          "One of the most common causes of liver damage and transplants in the U.S. — over 500 deaths a year, and half of overdoses happen by accident.",
        Diphenhydramine:
          "Known for causing drowsiness, but high doses can lead to irregular heartbeat or coma. Involved in 15% of fatal OTC overdoses.",
        Doxylamine:
          "A sleep aid that can cause muscle breakdown and kidney issues when taken in large amounts.",
        Dextromethorphan:
          "A cough suppressant that can cause hallucinations and confusion if overused — often misused recreationally, especially by teens.",
        Aspirin:
          "High doses can lead to stomach bleeding, hearing loss, and breathing problems.",
        Ibuprofen:
          "Prolonged use may cause stomach ulcers or kidney damage. Overdosing can trigger headaches and dizziness.",
        Naproxen:
          "Works like ibuprofen, but long-term use can harm your stomach and increase the risk of heart issues.",
        Phenylephrine:
          "Can raise blood pressure and cause sleep issues. Still found in many cold meds, even though its effectiveness is debated.",
      },
    };
  },
  computed: {
    ingredientListColorMap() {
      const map = {};
      const keys = Object.keys(this.ingredientMap);
      keys.forEach((key, i) => {
        map[key] = this.colors[i % this.colors.length];
      });
      return map;
    },
  },
  mounted() {
    this.drawChart();
    this.currentWarning = this.warnings[this.selectedIngredient] || null;
  },
  watch: {
    selectedIngredient() {
      this.drawChart();
      this.currentWarning = this.warnings[this.selectedIngredient] || null;
    },
  },
  methods: {
    selectIngredient(ingredient) {
      this.selectedIngredient = ingredient;
      this.currentWarning = this.warnings[ingredient] || null;
    },
    drawChart() {
      const svg = d3.select(this.$refs.svg);
      svg.selectAll("*").remove();

      const height = this.height;
      const categories = this.categories;
      const data = this.ingredientMap[this.selectedIngredient];
      const arcColor = this.ingredientListColorMap[this.selectedIngredient];

      const group = svg.append("g").attr("transform", "translate(183, 0)");

      const x = d3
        .scalePoint()
        .domain(categories)
        .range([400, this.width - 200]);

      const circleY = height - 160;
      const textY = height - 120;
      const arcY = height - 160;

      group
        .selectAll("circle")
        .data(categories)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d))
        .attr("cy", circleY)
        .attr("r", 12)
        .style("fill", (d) => (data.includes(d) ? arcColor : "#ccc"));

      group
        .selectAll("text")
        .data(categories)
        .enter()
        .append("text")
        .attr("x", (d) => x(d))
        .attr("y", textY)
        .text((d) => d)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-family", "kigelia-lgc, sans-serif")
        .style("font-weight", "600");

      for (let i = 0; i < data.length - 1; i++) {
        const start = x(data[i]);
        const end = x(data[i + 1]);
        const arcPath = [
          "M",
          start,
          arcY,
          "A",
          (end - start) / 2,
          ",",
          90,
          0,
          0,
          1,
          end,
          ",",
          arcY,
        ].join(" ");

        group
          .append("path")
          .attr("d", arcPath)
          .style("fill", "none")
          .attr("stroke", arcColor)
          .attr("stroke-width", 4);
      }
    },
  },
};
</script>

<style scoped>
.heat-section {
  font-family: "kigelia-lgc", sans-serif;
  height: 100vh;
  scroll-snap-align: start;
  background-color: #fdfdfd;
  position: relative;
}

.ingredient-list {
  position: absolute;
  top: 24%; /* ⬆️ 더 아래로 */
  left: 7%;
  display: flex;
  flex-direction: column;
  gap: 43px; /* ⬆️ 더 넓게 */
}

.ingredient-item {
  font-family: "kigelia-lgc", sans-serif;
  width: 200px; /* ⬆️ 더 길게 */
  height: 45px; /* ⬆️ 더 크고 명확하게 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 22px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ingredient-item.active {
  outline: 2px solid black;
  font-weight: bold;
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
  top: 30px;
  left: 40px;
}

.warning-box {
  position: absolute;
  top: 45%;
  left: 58%;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #333;
  border-radius: 12px;
  padding: 20px 30px;
  max-width: 660px;
  font-size: 18px;
  line-height: 1.6;
  color: black;
  font-family: "kigelia-lgc", sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
