<template>
  <section class="section">
    <svg
      ref="svg"
      :width="width"
      :height="height"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid meet"
    ></svg>

    <!-- 🔹 범례 -->
    <div class="legend">
      <div v-for="(color, name) in legendMap" :key="name" class="legend-item">
        <span class="color-dot" :style="{ backgroundColor: color }"></span>
        <span class="ingredient-name">{{ name }}</span>
      </div>
    </div>

    <!-- 🔹 타이틀 -->
    <h1 class="main-title">One Ingredient, Many Uses</h1>

    <!-- Tooltip -->
    <div class="tooltip" ref="tooltip"></div>
  </section>
</template>

<script>
import * as d3 from "d3";
import data from "@/assets/data/category_summary.json";

export default {
  name: "HeatSection",
  data() {
    return {
      width: 1200,
      height: 800,
      data,
      legendMap: {},
    };
  },
  mounted() {
    this.createTooltip();
    this.drawChart();
  },
  methods: {
    createTooltip() {
      const tooltip = d3.select(this.$refs.tooltip);
      tooltip
        .style("position", "absolute")
        .style("background", "#333")
        .style("color", "#fff")
        .style("padding", "6px 10px")
        .style("border-radius", "4px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("opacity", 0);
    },
    drawChart() {
      const svg = d3.select(this.$refs.svg);
      const tooltip = d3.select(this.$refs.tooltip);
      svg.selectAll("*").remove();

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pack = d3.pack().size([this.width, this.height]).padding(70);

      const filtered = this.data
        .map((cat) => {
          const children = Object.entries(cat)
            .filter(
              ([k, v]) =>
                ![
                  "Category",
                  "Total_Count",
                  "Num_Ingredients",
                  "Ingredients",
                ].includes(k) && +v > 2
            )
            .map(([name, value]) => ({ name, value: +value }));

          return {
            name: cat.Category,
            children,
          };
        })
        .filter((cat) => cat.children.length > 0);

      const formatted = {
        name: "root",
        children: filtered,
      };

      const root = d3
        .hierarchy(formatted)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);

      const nodes = pack(root).descendants().slice(1);

      const legendMap = {};
      nodes
        .filter((d) => !d.children)
        .forEach((d) => {
          if (!legendMap[d.data.name]) {
            legendMap[d.data.name] = color(d.data.name);
          }
        });
      this.legendMap = legendMap;

      const node = svg
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x},${d.y + 20})`);

      node
        .append("circle")
        .attr("r", (d) => d.r)
        .attr("fill", (d) => (d.children ? "#f2f2f2" : color(d.data.name)))
        .attr("stroke", "#ccc");

      node
        .filter((d) => !d.children)
        .on("mouseover", function (event, d) {
          tooltip
            .style("opacity", 1)
            .html(`<strong>${d.data.name}</strong>: ${d.data.value}`);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function () {
          tooltip.style("opacity", 0);
        });

      node
        .filter((d) => d.depth === 1)
        .append("text")
        .text((d) => d.data.name)
        .attr("text-anchor", "middle")
        .attr("dy", (d) => d.r + 16)
        .style("font-size", "14px")
        .style("font-weight", "bold");
    },
  },
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  background-color: #f9f9f9;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.tooltip {
  position: absolute;
  white-space: nowrap;
  z-index: 10;
  transition: opacity 0.2s ease;
}

.legend {
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  max-width: 240px;
  font-family: sans-serif;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 8px;
}

.ingredient-name {
  font-size: 13px;
  color: #444;
}

.main-title {
  position: absolute;
  top: 30px;
  left: 40px;
  font-size: 26px;
  font-weight: bold;
  color: #333;
  font-family: sans-serif;
}
</style>
