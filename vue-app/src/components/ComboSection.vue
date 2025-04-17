<template>
  <section class="combo-section">
    <h2 class="section-title">Try Your Combo</h2>
    <div class="card-grid">
      <div
        v-for="item in data"
        :key="item.product_name"
        class="card"
        :class="{ selected: isSelected(item) }"
        @click="toggleSelect(item)"
      >
        <img :src="getImage(item.image)" class="card-image" />
      </div>
    </div>

    <!-- 결과 메시지 -->
    <div class="result-box" v-if="selected.length > 0">
      <p v-if="overlapping.length > 0">
        <span v-if="selected.length === 2">
          ⚠️ "{{ overlapping.join(", ") }}" appears in both medications
        </span>
        <span v-else>
          🚫 "{{ overlapping.join(", ") }}" appears in all selected medications
        </span>
      </p>
      <p v-else class="safe">✅ No overlapping ingredients</p>
    </div>

    <!-- 선택 제한 경고 -->
    <p class="limit-warning" v-if="limitReached">
      ⚠️ You can only select up to 3 medications
    </p>
  </section>
</template>

<script>
import data from "@/assets/otc_data.json";

export default {
  name: "TryComboSection",
  data() {
    return {
      data,
      selected: [],
      limitReached: false,
    };
  },
  computed: {
    overlapping() {
      const all = this.selected.flatMap((item) =>
        item.ingredients.map((ing) => ing.name.trim())
      );

      const countMap = {};
      for (let ing of all) {
        countMap[ing] = (countMap[ing] || 0) + 1;
      }

      return Object.entries(countMap)
        .filter(([, count]) => count > 1)
        .map(([ing]) => ing);
    },
  },

  methods: {
    getImage(fileName) {
      return require(`@/assets/otc/${fileName}`);
    },
    isSelected(item) {
      return this.selected.some(
        (sel) => sel.product_name === item.product_name
      );
    },
    toggleSelect(item) {
      const index = this.selected.findIndex(
        (sel) => sel.product_name === item.product_name
      );
      if (index > -1) {
        this.selected.splice(index, 1);
        this.limitReached = false;
      } else {
        if (this.selected.length >= 3) {
          this.limitReached = true;
          return;
        }
        this.selected.push(item);
        this.limitReached = false;
      }
    },
  },
};
</script>

<style scoped>
.combo-section {
  min-height: 100vh;
  scroll-snap-align: start;
  padding: 40px;
  background-color: #fff;
  box-sizing: border-box;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #222;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 500px;
  overflow-y: auto;
  justify-content: center;
}

.card {
  width: 160px;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: 0.3s ease;
}

.card:hover {
  border-color: #aaa;
}

.card.selected {
  border-color: #453f8b;
  box-shadow: 0 0 0 3px rgba(69, 63, 139, 0.2);
}

.card-image {
  width: 100%;
  display: block;
  border-radius: 6px;
}

.result-box {
  margin: 30px auto 40px; /* 가운데 정렬 + 위아래 여백 */
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 95%;
  max-width: 1200px;
  text-align: center;
  font-size: 1rem;
}

.safe {
  color: #2e7d32;
  font-weight: 500;
}

.warning {
  color: #c62828;
  font-weight: 500;
}

.limit-warning {
  margin-top: 10px;
  color: #e65100;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
}
</style>
