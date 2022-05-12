<template>
  <div>
    <h1 @click="obj.count++">请点击我{{ obj.count }}</h1>
    <h1>computed: {{ double }}</h1>
    watchEffect {{ counter }}
  </div>
</template>
<script setup>
import { ref, computed, reactive, watchEffect, watch } from "vue";
const obj = reactive({
  count: 0,
});
const counter = ref(0);
let double = computed(() => obj.count * 2);
watchEffect(() => {
  console.log(obj.count);
});
watch([obj, counter], (newVal) => {
  console.log(newVal);
});
</script>
