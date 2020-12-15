<template>
  <component :is="tag"
             v-bind="$attrs"
             class="nav-item"
             tag="li"
             @click.native="hideSidebar">
    <a class="nav-link">
      <slot>
        <i v-if="icon" :class="icon"></i>
        <font-awesome-icon v-if="fontAwesome" :icon="icon"/>
        <p>{{ name }}</p>
      </slot>
    </a>
  </component>
</template>
<script>
export default {
  name: "sidebar-link",
  inheritAttrs: false,
  inject: {
    autoClose: {
      default: true
    },
    addLink: {
      default: () => {
      }
    },
    removeLink: {
      default: () => {
      }
    }
  },
  props: {
    name: String,
    icon: String,
    fontAwesome: Boolean,
    tag: {
      type: String,
      default: "router-link"
    }
  },
  methods: {
    hideSidebar() {
      if (this.autoClose) {
        this.$sidebar.displaySidebar(false);
      }
    },
    isActive() {
      return this.$el.classList.contains("active");
    }
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
  },
  beforeDestroy() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  }
};
</script>
<style>
</style>
