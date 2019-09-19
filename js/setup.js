// Файл setup.js
'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_AMOUNT_DEFAULT = 4;

var getRandomArrItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomWizardPerson = function () {
  return {
    name: getRandomArrItem(WIZARD_NAMES) + ' ' + getRandomArrItem(WIZARD_SURNAMES),
    coatColor: getRandomArrItem(WIZARD_COAT_COLOR),
    eyesColor: getRandomArrItem(WIZARD_EYES_COLOR)
  };
};

var getListOfWizards = function (amount) {
  var result = [];
  for (var i = 0; i < amount; i++) {
    result.push(getRandomWizardPerson());
  }
  return result;
};

var wizards = getListOfWizards(WIZARD_AMOUNT_DEFAULT);

var showElement = function (elem) {
  elem.classList.remove('hidden');
};

var userDialog = document.querySelector('.setup');
showElement(userDialog);

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizardsList) {
  var result = document.createDocumentFragment();
  for (var i = 0; i < wizardsList.length; i++) {
    result.appendChild(renderWizard(wizardsList[i]));
  }
  return result;
};

similarListElement.appendChild(renderWizards(wizards));

var similarList = userDialog.querySelector('.setup-similar');
showElement(similarList);
