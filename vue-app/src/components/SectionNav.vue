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
        { name: "intro", label: "Start" },
        { name: "hook", label: "Problem" },
        { name: "card", label: "Ingredients" },
        { name: "heat", label: "Categories" },
        { name: "combo", label: "Try" },
        { name: "much", label: "Dosage Guide" },
        { name: "end", label: "Label Check" },
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
  font-family: "kigelia-lgc", sans-serif;
  font-size: 20px;
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
