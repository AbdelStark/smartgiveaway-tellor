<template>
  <component :is="tag"
             v-click-outside="closeDropDown"
             :class="{show:isOpen}"
             class="dropdown"
             @click="toggleDropDown">
    <slot :is-open="isOpen" name="title-container">
      <component
        :is="titleTag"
        :aria-expanded="isOpen"
        :aria-label="title || ariaLabel"
        :class="titleClasses"
        class="dropdown-toggle btn-rotate"
        data-toggle="dropdown">
        <slot :is-open="isOpen" name="title">
          <i :class="icon"></i>
          {{ title }}
        </slot>
      </component>
    </slot>
    <ul :class="[{show:isOpen}, {'dropdown-menu-right': menuOnRight}, menuClasses]" class="dropdown-menu">
      <slot></slot>
    </ul>
  </component>
</template>
<script>
export default {
  name: "base-dropdown",
  props: {
    tag: {
      type: String,
      default: "div",
      description: "Dropdown html tag (e.g div, ul etc)"
    },
    titleTag: {
      type: String,
      default: "button",
      description: "Dropdown title (toggle) html tag"
    },
    title: {
      type: String,
      description: "Dropdown title",

    },
    icon: {
      type: String,
      description: "Dropdown icon"
    },
    titleClasses: {
      type: [String, Object, Array],
      description: "Title css classes"
    },
    menuClasses: {
      type: [String, Object],
      description: "Menu css classes"
    },
    menuOnRight: {
      type: Boolean,
      description: "Whether menu should appear on the right"
    },
    ariaLabel: String
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
      this.$emit("change", this.isOpen);
    },
    closeDropDown() {
      this.isOpen = false;
      this.$emit('change', false);
    }
  }
};
</script>
