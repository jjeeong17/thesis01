<template>
  <section class="combo-section" id="combo">
    <h2 class="title">Try your Combo</h2>

    <div class="card-grid">
      <div
        v-for="item in products"
        :key="item.product_name"
        class="card"
        :class="{ selected: selectedItems.includes(item) }"
        @click="selectItem(item)"
      >
        <img
          class="card-img"
          :src="require(`@/assets/otc/${item.image}`)"
          :alt="item.product_name"
        />
      </div>
    </div>

    <!-- warning-message -->
    <div class="warning-box">
      <template v-if="selectedItems.length === 0 || selectedItems.length === 1">
        <span class="icon">💡</span>You can select up to 3 medications.
      </template>

      <template v-else-if="selectedItems.length > 3">
        <span class="icon">❗</span>You can only select up to 3 medications.
      </template>

      <template v-else-if="frequentIngredients.length === 0">
        <span class="icon">✅</span>No shared ingredients among selected
        medications.
      </template>

      <template v-else>
        <div v-for="(count, ing) in ingredientShareMap" :key="ing">
          <span class="icon">⚠️</span>
          <template v-if="selectedItems.length === 2 && count === 2">
            {{ ing }} is found in both selected medications. Check the daily
            limit for {{ ing }}.
          </template>
          <template v-else-if="selectedItems.length === 3 && count === 3">
            {{ ing }} is found in all three selected medications. Check the
            daily limit for {{ ing }}.
          </template>
          <template v-else>
            {{ ing }} is found in {{ count }} of the
            {{ selectedItems.length }} selected medications. Check the daily
            limit for {{ ing }}.
          </template>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import otcData from "@/assets/data/otc_data1.json";

export default {
  name: "ComboSection",
  data() {
    return {
      products: otcData,
      selectedItems: [],
    };
  },
  computed: {
    // 2개 이상에서 공유되는 성분 목록
    frequentIngredients() {
      if (this.selectedItems.length < 2) return [];

      const countMap = {};

      this.selectedItems.forEach((item) => {
        item.ingredients.forEach((i) => {
          if (!countMap[i.name]) {
            countMap[i.name] = 1;
          } else {
            countMap[i.name]++;
          }
        });
      });

      return Object.keys(countMap).filter((key) => countMap[key] >= 2);
    },

    // 성분별 포함된 약의 개수
    ingredientShareMap() {
      if (this.selectedItems.length < 2) return {};

      const map = {};
      this.frequentIngredients.forEach((ing) => {
        const count = this.selectedItems.filter((item) =>
          item.ingredients.some((i) => i.name === ing)
        ).length;
        map[ing] = count;
      });

      return map;
    },
  },
  methods: {
    selectItem(item) {
      const index = this.selectedItems.indexOf(item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(item);
      }
    },
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
.combo-section {
  min-height: 100vh;
  padding: 40px 20px;
  background-color: white;
  text-align: center;
  scroll-snap-align: start;
}

.title {
  font-size: 60px;
  margin-bottom: 40px;
  color: white;
  text-align: left;
  margin-left: 70px;
  font-family: "kigelia-lgc", sans-serif;
  -webkit-text-stroke: 1px black;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  width: 200px;
  height: 250px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, border-color 0.3s;
  box-sizing: border-box;
}

.card:hover {
  transform: scale(1.05);
}

.card.selected {
  border-color: #b22223;
  border-width: 3px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  box-sizing: border-box;
}

.warning-box {
  position: sticky;
  bottom: 20px;
  background: white;
  border: 2px solid #333;
  border-radius: 14px;
  padding: 15px 40px;
  margin-top: 50px;
  font-weight: bold;
  font-size: 23px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
  font-family: "kigelia-lgc", sans-serif;
  z-index: 10;
  line-height: 1.5;
  text-align: center;
}

.icon {
  margin-right: 10px;
}
</style>
