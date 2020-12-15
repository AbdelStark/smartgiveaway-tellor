<template>
  <SlideYUpTransition :duration="animationDuration">
    <div v-show="show"
         :aria-hidden="!show"
         :class="[{'show d-block': show}, {'d-none': !show}, {'modal-mini': type === 'mini'}]"
         class="modal fade"
         role="dialog"
         tabindex="-1"
         @click.self="closeModal">

      <div :class="[{'modal-notice': type === 'notice'}, {'modal-dialog-centered': centered}, modalClasses]"
           class="modal-dialog">
        <div :class="[gradient ? `bg-gradient-${gradient}` : '',modalContentClasses]" class="modal-content">

          <div v-if="$slots.header" :class="[headerClasses]" class="modal-header">
            <slot name="header"></slot>
            <slot name="close-button">
              <button v-if="showClose"
                      aria-label="Close"
                      class="close"
                      data-dismiss="modal"
                      type="button"
                      @click="closeModal">
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </slot>
          </div>

          <div v-if="$slots.default" :class="bodyClasses" class="modal-body">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" :class="footerClasses" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>

    </div>
  </SlideYUpTransition>
</template>
<script>
import {SlideYUpTransition} from "vue2-transitions";

export default {
  name: "modal",
  components: {
    SlideYUpTransition
  },
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    centered: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "",
      validator(value) {
        let acceptedValues = ["", "notice", "mini"];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: 'Modal type (notice|mini|"") '
    },
    modalClasses: {
      type: [Object, String],
      description: "Modal dialog css classes"
    },
    modalContentClasses: {
      type: [Object, String],
      description: "Modal dialog content css classes"
    },
    gradient: {
      type: String,
      description: "Modal gradient type (danger, primary etc)"
    },
    headerClasses: {
      type: [Object, String],
      description: "Modal Header css classes"
    },
    bodyClasses: {
      type: [Object, String],
      description: "Modal Body css classes"
    },
    footerClasses: {
      type: [Object, String],
      description: "Modal Footer css classes"
    },
    animationDuration: {
      type: Number,
      default: 500,
      description: "Modal transition duration"
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
      this.$emit("close");
    }
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) {
        documentClasses.add("modal-open");
      } else {
        documentClasses.remove("modal-open");
      }
    }
  }
};
</script>
<style>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
