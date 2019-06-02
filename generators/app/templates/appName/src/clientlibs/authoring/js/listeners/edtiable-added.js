(function($document, $) {
  'use strict';
  init();

  // private functions
  function init() {
    var isCorrectWebsite = window.location.href.indexOf('aemarch13') > -1;

    if (isCorrectWebsite) {
      $document.on('cq-inspectable-added', cb_inspectableAdded);
    }
  }

  function cb_inspectableAdded(evt) {
    try {
      var inspectable = evt.inspectable;
      var ajaxConfig = {
        url: evt.inspectable.path,
        data: {
          'sling:resourceType': inspectable.type
        },
        async: false
      };

      if(inspectable.type.indexOf('aemarch13/dist') > -1 || inspectable.type.match(/wcm\/foundation\/components\/responsivegrid$/)) $.post(ajaxConfig);
    } catch(e) {
      console.error(e);
    }
  }
}($(document), jQuery));
