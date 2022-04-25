
const createApp = (rootComponent) => {
  return {
    mount(selector) {
      let isMounted = false;
      let preVNode = null;

      watchEffect(() => {
        if (!isMounted) {
          preVNode = rootComponent.render();
          debugger;
          mount(preVNode, document.querySelector(selector));
          isMounted = true;
        } else {
          const newVNode = rootComponent.render();
          patch(preVNode, newVNode);
          preVNode = newVNode;
        }
      })
    }
  };
}
