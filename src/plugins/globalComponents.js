import {BaseButton, BaseCheckbox, BaseDropdown, BaseInput, Card} from "../components/index";
import {BFormSelect} from "bootstrap-vue";

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(Card.name, Card);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component('b-form-select', BFormSelect);
  }
};

export default GlobalComponents;
