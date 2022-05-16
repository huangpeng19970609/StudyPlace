<template>
  <slot></slot>
  <p>---------------</p>
  <div>{{ props.rate }} <button @click="change">子组件请求加1</button></div>

  <h1>
    {{ props.modelValue }}
    <input v-model="str" />
    <button @click="changeStr">modelValue更改字符串</button>
  </h1>
</template>
<script setup>
const str = ref("11111111111");
import { defineProps, defineEmits, ref } from "vue";
const emits = defineEmits(["update-rate", "update:modelValue"]);
const props = defineProps({
  rate: Number,
  modelValue: String,
});
function change() {
  emits("update-rate", props.rate);
}
function changeStr() {
  console.log(str.value);
  emits("update:modelValue", str.value);
}
</script>
