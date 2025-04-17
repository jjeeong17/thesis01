<template>
  <section class="much-section">
    <h2 class="section-title">Know Your Limit</h2>
    <div class="pill-grid">
      <div v-for="item in data" :key="item.ingredient" class="pill-visual">
        <div class="pill-card">
          <div class="pill-background">
            <div
              v-for="n in item.outer_pill"
              :key="n"
              class="pill"
              :class="{ filled: n <= item.inner_pill }"
            >
              <div class="tooltip">
                <template v-if="n <= item.inner_pill">
                  {{ item.per_pill }}mg
                </template>
                <template v-else> {{ item.outer }}mg (max/day) </template>
              </div>
            </div>
          </div>
          <p class="hours-text">Interval: {{ item.Hours }} hr</p>
        </div>
        <p class="ingredient-name">{{ item.ingredient }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import data from "@/assets/much_data.json";

export default {
  name: "MuchSection",
  data() {
    return {
      data,
    };
  },
};
</script>

<style scoped>
.much-section {
  min-height: 100vh;
  scroll-snap-align: start;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #222;
}

.pill-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1200px;
  width: 100%;
}

.pill-visual {
  text-align: center;
  overflow: visible;
}

.ingredient-name {
  font-weight: bold;
  margin-top: 10px;
  font-size: 1.1rem;
}

.pill-card {
  background-color: #7bbec4;
  padding: 12px;
  border-radius: 20px;
  display: inline-block;
}

.pill-background {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 6px;
  justify-content: center;
  margin-bottom: 6px;
}

.pill {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #a7dcf3;
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer;
}

.pill.filled {
  background-color: #453f8b;
  border: 2px solid white;
}

.tooltip {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 3px 6px;
  font-size: 12px;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  transition: all 0.2s ease;
}

.pill:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.hours-text {
  font-size: 0.85rem;
  color: #111;
  text-align: right;
  margin: 0;
}
</style>
