<template>
  <section class="much-section" id="much">
    <h2 class="title">How Much is Too Much?</h2>

    <!-- ↓↓ Legend Section -->
    <div class="pill-legend">
      <ul>
        <li><strong>Top-right number:</strong> max daily dose (mg)</li>
        <li><span class="pill filled legend-pill"></span> = pills per dose</li>
        <li><span class="pill legend-pill"></span> = daily max pills</li>
        <li><strong>HR</strong> = time between doses (hours)</li>
      </ul>
    </div>

    <div class="pill-grid">
      <div v-for="item in data" :key="item.ingredient" class="pill-visual">
        <div class="pill-card">
          <div class="max-label">{{ item.day_max }}mg</div>

          <div class="pill-background">
            <div
              v-for="n in item.day_pill"
              :key="n"
              class="pill"
              :class="{ filled: n <= item.one_pill }"
            >
              <div class="tooltip" v-if="n <= item.one_pill">
                {{ item.per_pill }}mg
              </div>
            </div>
          </div>
        </div>

        <p class="ingredient-name">{{ item.ingredient }}</p>
        <p class="hours-text">{{ item.hours }}HR</p>
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
  mounted() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.$emit("enter");
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    observer.observe(this.$el);
  },
};
</script>

<style scoped>
.much-section {
  position: relative;
  min-height: 100vh;
  scroll-snap-align: start;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 330px;
  box-sizing: border-box;
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

.pill-legend {
  position: absolute;
  top: 90px;
  right: 15px;
  padding: 10px 55px;
  font-family: "kigelia-lgc", sans-serif;
  font-size: 22px;
  color: #333;
  width: auto;
  max-width: 400px;
}

.pill-legend ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pill-legend li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.legend-pill {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.pill.filled.legend-pill {
  background-color: #453f8b;
  border: 2px solid white;
}

.pill.legend-pill {
  background-color: #a7dcf3;
}

.pill-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 80px 120px;
  max-width: 1300px;
  width: 100%;
}

.pill-visual {
  text-align: left;
}

.pill-card {
  background-color: #7bbec4;
  padding: 12px;
  border-radius: 20px;
  margin-left: -60%;
  width: 340px;
  height: 220px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pill-background {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 36px; /* 알약보다 살짝 작은 높이 */
  margin-top: 105px;
  column-gap: 7px;
  row-gap: 35px;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.pill {
  width: 45px;
  height: 45px;
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
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 3px 6px;
  font-size: 17px;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  transition: all 0.2s ease;
  font-family: "kigelia-lgc", sans-serif;
}

.pill:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.max-label {
  position: absolute;
  top: 6px;
  right: 10px;
  font-size: 19px;
  letter-spacing: 1.3px;
  font-weight: bold;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 6px;
  border-radius: 6px;
  font-family: "kigelia-lgc", sans-serif;
}

.ingredient-name {
  font-weight: bold;
  margin-top: 27px;
  margin-left: -410px;
  font-size: 27px;
  text-align: center;
  font-family: "kigelia-lgc", sans-serif;
}

.hours-text {
  font-size: 22px;
  color: #333;
  text-align: left;
  margin-top: -28%;
  margin-left: 60px;
  font-family: "kigelia-lgc", sans-serif;
}
</style>
