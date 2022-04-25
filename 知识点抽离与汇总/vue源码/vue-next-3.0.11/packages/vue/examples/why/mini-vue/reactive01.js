class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach(effect => {
      effect();
    })
  }
}

const dep = new Dep();
let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  dep.depend();
  effect();
  activeEffect = null;
}

watchEffect(() => {
  console.log("依赖回调1");
})

watchEffect(() => {
  console.log("依赖回调2");
})

dep.notify();


