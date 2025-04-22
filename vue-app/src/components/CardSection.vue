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
                v-for="ing in item.ingredients"
                :key="ing.name"
                class="ingredient"
                :style="{
                  backgroundColor: ingredientColor(ing.name),
                  color: '#fff',
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
  "#ff0000",
  "#7f0000",
  "#ff8080",
  "#bf8080",
  "#ffbf00",
  "#7f5f00",
  "#ffdf80",
  "#bfaf80",
  "#80ff00",
  "#407f00",
  "#c0ff80",
  "#a0bf80",
  "#00ff40",
  "#007f20",
  "#80ffa0",
  "#80bf90",
  "#00ffff",
  "#007f7f",
  "#80ffff",
  "#80bfbf",
  "#0040ff",
  "#00207f",
  "#80a0ff",
  "#8090bf",
  "#8000ff",
  "#40007f",
  "#c080ff",
  "#a080bf",
  "#ff00bf",
  "#7f005f",
  "#ff80df",
  "#bf80af",
  "#6d6d6d",
  "#929292",
  "#b6b6b6",
  "#dbdbdb",
  "#494949",
  "#854D6D",
  "#E99881",
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
  font-size: 55px;
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
  font-size: 20px;
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
  font-size: 18px;
  color: #222;
  font-weight: bold;
  text-align: center;
  font-family: "kigelia-lgc", sans-serif;
}

.ingredient-list li {
  margin-bottom: 4px;
}
</style>
