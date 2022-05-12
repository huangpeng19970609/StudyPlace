<template>
  <button @click="changeColor">{{ color }}</button>
  <h1>XXXXXXXXXXXXXXXXXXXXXXXXX</h1>
</template>

<script setup>
import { ref } from "vue";
const colorArr = ["red", "pink", "green", "black", "blue"];
let color = ref("red");
function changeColor() {
  const num = Math.floor(Math.random() * 5);
  console.log(num);
  color.value = colorArr[num];
}
</script>

<style lang="scss" scoped>
h1 {
  color: v-bind(color);
}
</style>