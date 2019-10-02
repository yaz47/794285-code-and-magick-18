'use strict';

(function () {
  window.utils = {
    KEY_CODE: {
      ESC: 27,
      ENTER: 13
    },
    onError: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    URL: {
      SAVE: 'https://js.dump.academy/code-and-magick',
      LOAD: 'https://js.dump.academy/code-and-magick/data'
    }
  };
})();
