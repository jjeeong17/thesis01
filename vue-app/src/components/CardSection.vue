<template>
  <section class="card-section" id="card">
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
                v-for="ing in item.ingredients
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))"
                :key="ing.name"
                class="ingredient"
                :style="{
                  backgroundColor: ingredientColor(ing.name),
                  color: '#000',
                  borderRadius: '5px',
                  padding: '3px 6px',
                }"
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

const ingredientList = [
  "Fexofenadine",
  "Azelastine",
  "Diphenhydramine",
  "Loratadine",
  "Levocetirizine",
  "Cetirizine",
  "Triamcinolone acetonide",
  "Fluticasone Propionate",
  "Phenylephrine",
  "Dextromethorphan",
  "Guaifenesin",
  "Acetaminophen",
  "Doxylamine",
  "Calcium Carbonate",
  "Aluminum Hydroxide",
  "Magnesium Hydroxide",
  "Simethicone",
  "Anhydrous Citric Acid",
  "Sodium Bicarbonate",
  "Famotidine",
  "Esomeprazole",
  "Omeprazole",
  "Ibuprofen",
  "Aspirin",
  "Naproxen Sodium",
  "Caffeine",
  "Pyrilamine Maleate",
  "Lidocaine",
  "Camphor",
  "Menthol",
  "Methyl Salicylate",
  "Diclofenac Sodium",
  "Pamabrom",
  "Magnesium Salicylate",
  "Benzocaine",
  "Chlorpheniramine Maleate",
  "Oxymetazoline Hydrochloride",
  "Pseudoephedrine",
];

const customColors = [
  "#75C3B1",
  "#B9E4D6",
  "#C7E9E4",
  "#E2ECE9",
  "#E2F4FE",
  "#C6E9FE",
  "#9DD7FF",
  "#7AC9FF",
  "#869ACF",
  "#C0C5E9",
  "#7DCFD1",
  "#ACE1E4",
  "#C4F0F1",
  "#D8AED4",
  "#EBCAE7",
  "#FFE1EB",
  "#FFCCDA",
  "#FEC3DA",
  "#FFA8C0",
  "#FD90AF",
  "#FED2C7",
  "#FFCDD3",
  "#FFBEC3",
  "#FFA2AB",
  "#FF929F",
  "#FFEAAB",
  "#FFE3B1",
  "#FFD17E",
  "#FEBE8E",
  "#FFA887",
  "#D67B98",
  "#6D7498",
  "#2D6288",
  "#397921",
  "#706E1F",
  "#23DED3",
  "#FF8E77",
  "#A6018A",
  "#941C4C",
];

// ingredient → color 매핑 객체 만들기
const ingredientToColor = {};
ingredientList.forEach((name, index) => {
  ingredientToColor[name] = customColors[index % customColors.length];
});

export default {
  name: "CardSection",
  data() {
    return {
      products: otcData,
      selectedCategory: "All",
      flippedItems: [],
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.$emit("enter"); // App.vue로 전달
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    observer.observe(this.$el);
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
      this.flippedItems = [];
    },
    flipCard(item) {
      const index = this.flippedItems.indexOf(item);
      if (index !== -1) {
        this.flippedItems.splice(index, 1);
      } else {
        this.flippedItems.push(item);
      }
    },
    ingredientColor(name) {
      return ingredientToColor[name] || "#ccc";
    },
  },
};
</script>

<style scoped>
.card-section {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-align: start;
  padding: 40px 20px;
  background-color: white;
  text-align: center;
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
}

.filters {
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.filters button {
  margin: 5px;
  padding: 7px 14px;
  border: 1px solid black;
  background: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s;
  font-family: "kigelia-lgc", sans-serif;
  font-size: 25px;
  line-height: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 250px;
  perspective: 1000px;
  cursor: pointer;
}

.card:hover .card-inner {
  transform: scale(1.05);
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
  box-sizing: border-box;
}

.card-front {
  background: #fff;
}

.card-back {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  padding: 10px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  box-sizing: border-box;
}

.ingredient-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 20px;
  color: #222;
  font-weight: bold;
  text-align: center;
  font-family: "kigelia-lgc", sans-serif;
}

.ingredient-list li {
  margin-bottom: 4px;
  display: block;
  width: 170px;
  text-align: center;
  border-radius: 5px;
  padding: 3px 6px;
}
</style>
