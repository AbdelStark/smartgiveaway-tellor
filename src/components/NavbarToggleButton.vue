<template>
  <button :aria-controls="target" :aria-expanded="toggled"
          :data-target="target"
          aria-label="Toggle navigation"
          class="navbar-toggler"
          data-toggle="collapse"
          type="button">
    <span class="navbar-toggler-icon"></span>
  </button>
</template>
<script>
export default {
  props: {
    target: {
      type: [String, Number],
      description: "Button target element"
    },
    toggled: {
      type: Boolean,
      default: false,
      description: "Whether button is toggled"
    }
  }
};
</script>
<style>
</style>
