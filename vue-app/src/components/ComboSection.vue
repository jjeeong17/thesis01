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

    <!-- 경고 메시지 -->
    <div class="warning-box">
      <template v-if="selectedItems.length === 0 || selectedItems.length === 1">
        <span class="icon">💡</span>You can select up to 3 medications.
      </template>

      <template v-else-if="selectedItems.length > 3">
        <span class="icon">❗</span>You can only select up to 3 medications.
      </template>

      <template v-else-if="sharedIngredients.length === 0">
        <span class="icon">✅</span>No shared ingredients among selected
        medications.
      </template>

      <template v-else>
        <template v-if="allShare">
          <span class="icon">⚠️</span>All selected medications contain “{{
            sharedIngredients.join(", ")
          }}”.
        </template>
        <template v-else-if="partialShareCount > 1">
          <span class="icon">⚠️</span>“{{ sharedIngredients.join(", ") }}” is
          shared by {{ partialShareCount }} out of
          {{ selectedItems.length }} selected medications.
        </template>
        <template v-else>
          <span class="icon">⚠️</span>All selected medications contain “{{
            sharedIngredients.join(", ")
          }}”.
        </template>
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
    sharedIngredients() {
      if (this.selectedItems.length < 2) return [];
      const allIngredients = this.selectedItems.map((item) =>
        item.ingredients.map((i) => i.name)
      );
      return allIngredients.reduce((a, b) => a.filter((i) => b.includes(i)));
    },
    allShare() {
      if (this.sharedIngredients.length === 0) return false;
      return this.sharedIngredients.every((ing) =>
        this.selectedItems.every((item) =>
          item.ingredients.some((i) => i.name === ing)
        )
      );
    },
    partialShareCount() {
      const ing = this.sharedIngredients;
      const selected = this.selectedItems;

      const countMap = ing.map(
        (sharedIng) =>
          selected.filter((item) =>
            item.ingredients.some((i) => i.name === sharedIng)
          ).length
      );

      return Math.max(...countMap);
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
  font-size: 55px;
  margin-bottom: 30px;
  color: black;
  text-align: left;
  margin-left: 70px;
  font-family: "kigelia-lgc", sans-serif;
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
  padding: 15px 40px; /* 👉 더 넓고 높게 */
  margin-top: 50px;
  font-weight: bold;
  font-size: 25px; /* 👉 글씨도 살짝 키움 */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  max-width: 55%; /* 👉 더 길게 */
  margin-left: auto;
  margin-right: auto;
  font-family: "kigelia-lgc", sans-serif;
  z-index: 10;
  line-height: 1.5; /* 👉 줄 간격 여유 있게 */
  text-align: center; /* 👉 가운데 정렬 */
}
.icon {
  margin-right: 10px;
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
</style>
