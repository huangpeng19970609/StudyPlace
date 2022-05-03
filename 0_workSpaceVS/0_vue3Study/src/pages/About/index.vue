<template>
  <div>
    <p>
      i am a counter {{ count }}
      <button @click="increment">increment</button>
    </p>
  </div>
</template>
<script setup>
import useCounter from "../../hooks/useCounter/index.js";
const { count, increment } = useCounter();
</script>

