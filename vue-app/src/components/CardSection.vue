<template>
  <section class="card-section">
    <h2 class="title">What's Really Inside?</h2>

    <!-- 필터 버튼 -->
    <div class="filters">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectCategory(cat)"
        :class="{ active: selectedCategory === cat }"
      >
        {{ cat }}
      </button>
    </div>

    <!-- 카드 그리드 -->
    <div class="card-grid">
      <div
        v-for="item in filteredProducts"
        :key="item.product_name"
        class="card"
        :class="{ flipped: flippedItems.includes(item) }"
        @click="flipCard(item)"
      >
        <div class="card-inner">
          <div class="card-front">
            <img
              class="card-img"
              :src="require(`@/assets/otc/${item.image}`)"
              :alt="item.product_name"
            />
          </div>
          <div class="card-back">
            <ul class="ingredient-list">
              <li
                v-for="ing in item.ingredients"
                :key="ing.name"
                class="ingredient"
              >
                {{ ing.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import otcData from "@/assets/data/otc_data1.json";

export default {
  name: "CardSection",
  data() {
    return {
      products: otcData,
      selectedCategory: "All",
      flippedItems: [], // <-- 여러 개의 카드 상태를 저장
    };
  },
  computed: {
    categories() {
      const cats = new Set();
      this.products.forEach((p) => {
        p.category.split(",").forEach((c) => cats.add(c.trim()));
      });
      return ["All", ...Array.from(cats)];
    },
    filteredProducts() {
      if (this.selectedCategory === "All") return this.products;
      return this.products.filter((item) =>
        item.category.includes(this.selectedCategory)
      );
    },
  },
  methods: {
    selectCategory(cat) {
      this.selectedCategory = cat;
      this.flippedItems = []; // 필터 바꿀 때 모두 초기화
    },
    flipCard(item) {
      const index = this.flippedItems.indexOf(item);
      if (index !== -1) {
        this.flippedItems.splice(index, 1); // 다시 클릭하면 닫기
      } else {
        this.flippedItems.push(item); // 새로 열기
      }
    },
  },
};
</script>

<style scoped>
.card-section {
  min-height: 100vh;
  scroll-snap-align: start;
  padding: 40px 20px;
  background-color: white;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.filters {
  margin-bottom: 30px;
}

.filters button {
  margin: 5px;
  padding: 8px 14px;
  border: 1px solid black;
  background: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s;
}

.filters button.active {
  background-color: black;
  color: white;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  width: 200px;
  height: 180px;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.card-front {
  background: #fff;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-back {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  padding: 10px;
}

.ingredient-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  color: #222;
  font-weight: bold;
  text-align: left;
}

.ingredient-list li {
  margin-bottom: 4px;
}
</style>
