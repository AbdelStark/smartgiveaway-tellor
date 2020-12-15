<template>
  <fade-transition>
    <div v-if="visible" :class="[`alert-${type}`, { 'alert-with-icon': withIcon }]" class="alert" role="alert">
      <slot v-if="!dismissible"></slot>
      <div v-else class="container">
        <slot></slot>
        <slot name="dismiss-icon">
          <button aria-label="Close" class="close" type="button" @click="dismissAlert">
                  <span aria-hidden="true">
                    <i class="tim-icons icon-simple-remove"></i>
                  </span>
          </button>
        </slot>
      </div>
    </div>
  </fade-transition>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';

export default {
  name: 'base-alert',
  components: {
    FadeTransition
  },
  props: {
    type: {
      type: String,
      default: 'default',
      description: 'Alert type'
    },
    dismissible: {
      type: Boolean,
      default: false,
      description: 'Whether alert is dismissible (closeable)'
    },
    withIcon: {
      type: Boolean,
      default: false,
      description: 'Whether alert contains icon'
    }
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    dismissAlert() {
      this.visible = false;
    }
  }
}
</script>
