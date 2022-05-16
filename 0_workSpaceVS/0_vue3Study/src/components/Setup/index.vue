<template>
  <div>
    <p>ref测试</p>
    <h1 @click="add">我是一个累加器{{ count }}</h1>
    <p>ref-array测试</p>
    <input type="text" v-model="title" />
    <button @click="addList">添加一个标题</button>
    <div v-for="(item, index) in list" :key="index">
      <div>{{ item.title }}</div>
    </div>
    <p>computed测试</p>
    <div>存在{{ listLength }}个标题的长度? 触发了几次{{ listLength }}</div>
    <div>存在{{ listLength }}个标题的长度? 触发了几次{{ listLength }}</div>
    <div>存在{{ listLength }}个标题的长度? 触发了几次{{ listLength }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
let count = ref(0);
let title = ref("");
let list = ref([
  {
    title: "默认标题",
    done: false,
  },
]);
const computedLength = ref(0);
const listLength = computed(() => {
  computedLength.value++;
  return list.value.length;
});
function add() {
  count.value++;
}
function addList() {
  console.log(list);
  list.value.push({
    title: title.value,
    done: false,
  });
  title.value = "";
}
</script>

<style lang="scss" scoped>
p {
  color: pink;
}
</style>