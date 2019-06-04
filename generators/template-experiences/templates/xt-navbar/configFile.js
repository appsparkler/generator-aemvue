import Extractor from 'classes/VueComponentNameAndTemplateStringExtractor';

// styles
import './styles.scss';

// scripts
export default class <%= modifiedAnswers.config %>ComponentConfig {
  // name and config do not need to be added as they will be generated dynamically from the document HTML
  config = { }

  constructor(el) {
    const extractor = new Extractor(el);
    this.config.name = extractor.name;
    this.config.template = extractor.template;
  }
}
