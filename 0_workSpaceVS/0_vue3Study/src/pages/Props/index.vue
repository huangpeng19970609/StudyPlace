<template>
  <h1>
    <button
      @click="
        _scoreOne++;
        _scoreTwo++;
      "
    >
      加
    </button>
  </h1>
  <Rate :rate="_scoreOne" v-model="str" @update-rate="(val) => add(val, 1)">
    我是一个查抄
  </Rate>
  <Rate
    :rate="_scoreTwo"
    v-model="str"
    @update-rate="(val) => add(val, 2)"
  ></Rate>

  父组件的v-model{{ str }}
</template>
<script setup>
import Rate from "./component/Rate.vue";
import { ref } from "vue";
let _scoreOne = ref(3);
let _scoreTwo = ref(4);
function add(val, type) {
  if (type === 1) {
    _scoreOne.value = val + 1;
  } else {
    _scoreTwo.value = val + 1;
  }
}

const str = ref("asdsadsdada");
</script>
