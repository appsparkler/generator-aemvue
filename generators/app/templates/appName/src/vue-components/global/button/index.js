import $ from 'jquery';
import {VueAEMComponent} from 'common-script';

generate_buttonComponents();

function generate_buttonComponents() {
  try {
      $('[is^=vc-global-button]').each(generate_buttonComponent);
  } catch (e) {
    console.error(e);
  }
}

export function generate_buttonComponent() {
    new VueAEMComponent(this, {
      props: ['buttonConfig'],
      data:function() {
        return {
          title: 'Search'
        }
      },
      methods: {
        buttonClicked() {
          alert('button-clicked (called from button)');
          try {
            if(
              this.buttonConfig &&
              this.buttonConfig.buttonClicked
            ) this.buttonConfig.buttonClicked();
          } catch (e) {
            console.error(e);
          }
        }
      }
    })
}
