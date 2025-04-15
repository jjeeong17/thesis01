<template>
  <nav class="nav">
    <ul>
      <li
        v-for="s in sections"
        :key="s.name"
        @click="$emit('navigate', s.name)"
        :class="{ active: current === s.name }"
      >
        {{ s.label }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["current"],
  data() {
    return {
      sections: [
        { name: "intro", label: "Intro" },
        { name: "hook", label: "Hook" },
        { name: "card", label: "Card" },
        { name: "combo", label: "Combo" },
        { name: "heat", label: "Heat" },
        { name: "much", label: "Dosage" },
        { name: "end", label: "End" },
      ],
    };
  },
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
}
.nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
}
.nav li {
  cursor: pointer;
  color: #aaa;
  font-weight: 500;
}
.nav li.active {
  color: #d33;
  font-weight: bold;
}
</style>
