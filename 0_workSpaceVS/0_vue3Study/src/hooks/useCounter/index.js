import { ref } from "vue";
export default function useCounter() {
  let count = ref(0);
  const increment = () => {
    count.value++;
  };
  return {
    count,
    increment,
  };
}
