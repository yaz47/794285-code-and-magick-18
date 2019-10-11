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

  var coatColor = setupWizardAppearance.querySelector('input[name="coat-color"]').value;
  var eyesColor = setupWizardAppearance.querySelector('input[name="eyes-color"]').value;
  var fireballColor = setupFireballWrap.querySelector('input[name="fireball-color"]').value;
  var wizards = [];

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

  var renderWizards = function (wizardsData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_AMOUNT_DEFAULT; i++) {
      fragment.appendChild(renderWizard(wizardsData[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var destroyWizards = function () {
    similarListElement.innerHTML = '';
  };

  var updateWizards = function () {
    destroyWizards();
    renderWizards(wizards.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
        }
        return rankDiff;
      }));
  };

  var onWizardLoad = function (data) {
    wizards = data;
    updateWizards();
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
    coatColor = getNextItem(countCoat, WIZARD_COAT_COLOR);
    setupWizardCoat.style.fill = coatColor;
    setupWizardAppearance.querySelector('input[name="coat-color"]').value = coatColor;
  };

  var changeWizardsEyes = function () {
    eyesColor = getNextItem(countEyes, WIZARD_EYES_COLOR);
    setupWizardEyes.style.fill = eyesColor;
    setupWizardAppearance.querySelector('input[name="eyes-color"]').value = eyesColor;
  };

  var changeFireball = function () {
    fireballColor = getNextItem(countFireball, WIZARD_FIREBALL_COLOR);
    setupFireball.style.backgroundColor = fireballColor;
    setupFireballWrap.querySelector('input[name="fireball-color"]').value = fireballColor;
  };

  setupWizardCoat.addEventListener('click', function () {
    changeWizardsCoat();
    window.debounce(updateWizards)();
  });

  setupWizardEyes.addEventListener('click', function () {
    changeWizardsEyes();
    window.debounce(updateWizards)();
  });

  setupFireball.addEventListener('click', function () {
    changeFireball();
  });
})();
