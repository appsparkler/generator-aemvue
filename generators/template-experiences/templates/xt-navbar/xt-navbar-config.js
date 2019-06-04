import Extractor from 'classes/VueComponentNameAndTemplateStringExtractor';

// styles
import './styles.scss';

// scripts
export default class XTNavbarComponentConfig {
  // name and config do not need to be added as they will be generated dynamically from the document HTML
  config = {
    data: function() {
      return {
        test: 'Hello...',
        imageLinkConfig: {
          linkClicked() {
            alert('link Clicked passed from parent...');
          }
        }
      };
    },
    //
    methods: {
      linkClicked() {
        alert('link Clicked...')
      }
    }
  }

  constructor(el) {
    const extractor = new Extractor(el);
    this.config.name = extractor.name;
    this.config.template = extractor.template;
  }
}
