'use strict';

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_AMOUNT_DEFAULT = 4;

  var setup = document.querySelector('.setup');
  var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');
  var setupWizardCoat = setupWizardAppearance.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizardAppearance.querySelector('.wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');
  var setupFireball = setupFireballWrap.querySelector('.setup-fireball');
  var similarList = setup.querySelector('.setup-similar');
  var similarListElement = setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var showElement = function (elem) {
    elem.classList.remove('hidden');
  };

  var onWizardLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_AMOUNT_DEFAULT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    showElement(similarList);
  };

  window.backend.load(window.utils.URL.LOAD, onWizardLoad, window.utils.onError);

  var getCounter = function (start, end) {
    var counter = start;
    return function () {
      counter = counter < end ? ++counter : start;
      return counter;
    };
  };

  var getNextItem = function (counter, arr) {
    var position = counter();
    return arr[position];
  };

  var countCoat = getCounter(0, WIZARD_COAT_COLOR.length - 1);
  var countEyes = getCounter(0, WIZARD_EYES_COLOR.length - 1);
  var countFireball = getCounter(0, WIZARD_FIREBALL_COLOR.length - 1);

  var changeWizardsCoat = function () {
    var color = getNextItem(countCoat, WIZARD_COAT_COLOR);
    setupWizardCoat.style.fill = color;
    setupWizardAppearance.querySelector('input[name="coat-color"]').value = color;
  };

  var changeWizardsEyes = function () {
    var color = getNextItem(countEyes, WIZARD_EYES_COLOR);
    setupWizardEyes.style.fill = color;
    setupWizardAppearance.querySelector('input[name="eyes-color"]').value = color;
  };

  var changeFireball = function () {
    var color = getNextItem(countFireball, WIZARD_FIREBALL_COLOR);
    setupFireball.style.backgroundColor = color;
    setupFireballWrap.querySelector('input[name="fireball-color"]').value = color;
  };

  setupWizardCoat.addEventListener('click', function () {
    changeWizardsCoat();
  });

  setupWizardEyes.addEventListener('click', function () {
    changeWizardsEyes();
  });

  setupFireball.addEventListener('click', function () {
    changeFireball();
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
