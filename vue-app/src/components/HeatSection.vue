<template>
  <section class="section">
    <h2>Heat Section</h2>
  </section>
</template>

<script>
export default {
  name: "HeatSection",
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaf7ff; /* 다른 색으로 구분 가능 */
}
</style>
