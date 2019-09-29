'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_GAP = 10;
  var FONT = 'normal normal 16px/1 "PT Mono", monospace';
  var FONT_COLOR = '#000';
  var FONT_HEIGHT = 20;
  var BAR_HEIGHT_MAX = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var BAR_COLOR_DEFAULT = 'rgba(255, 0, 0, 1)';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    if (arr.length === 0) {
      return null;
    }

    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getRandomBarColor = function () {
    return 'rgba(0, 0, 255, 0.' + Math.max(Math.trunc(Math.random() * 10), 1) + ')';
  };

  var renderColumn = function (ctx, players, times, i, maxTime) {
    var xCoord = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barHeight = BAR_HEIGHT_MAX * (times[i] / maxTime);

    ctx.fillStyle = FONT_COLOR;
    ctx.textBaseline = 'ideographic';
    ctx.fillText(players[i], xCoord, CLOUD_Y + CLOUD_HEIGHT - FONT_HEIGHT);

    ctx.fillStyle = players[i] === 'Вы' ? BAR_COLOR_DEFAULT : getRandomBarColor();
    ctx.fillRect(xCoord, CLOUD_Y + CLOUD_HEIGHT - FONT_HEIGHT - FONT_HEIGHT - barHeight, BAR_WIDTH, barHeight);

    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(Math.round(times[i]) + '', xCoord, CLOUD_Y + CLOUD_HEIGHT - FONT_HEIGHT - FONT_HEIGHT - barHeight);
  };

  var renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.3)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = FONT_COLOR;
    ctx.font = FONT;
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + FONT_HEIGHT, CLOUD_Y + FONT_HEIGHT);
    ctx.fillText('Список результатов:', CLOUD_X + FONT_HEIGHT, CLOUD_Y + FONT_HEIGHT + FONT_HEIGHT);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      renderColumn(ctx, players, times, i, maxTime);
    }
  };

  window.renderStatistics = renderStatistics;
})();
