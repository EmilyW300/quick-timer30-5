var TOTAL_SECONDS, state, digits, slots, formatTime, flipTo, updateDisplay, finish, updatePauseCount, updatePauseButton, resetTimer, startInterval, pauseTimer, resumeTimer, startPomodoro, setup;
TOTAL_SECONDS = 25 * 60;
state = {
  remaining: TOTAL_SECONDS,
  timer: null,
  endSound: null,
  pauseCount: 0,
  paused: false
};
digits = {};
slots = ['m-ten', 'm-one', 's-ten', 's-one'];
formatTime = function(seconds){
  var minutes, secs;
  minutes = Math.floor(seconds / 60);
  secs = seconds % 60;
  return [Math.floor(minutes / 10), minutes % 10, Math.floor(secs / 10), secs % 10];
};
flipTo = function(card, newVal, force){
  var bottom, current, flipBottom, flipTop, top, _;
  force == null && (force = false);
  current = card.getAttribute('data-value');
  if (!force && current === String(newVal)) {
    return;
  }
  card.setAttribute('data-value', newVal);
  top = card.querySelector('.top');
  bottom = card.querySelector('.bottom');
  flipTop = card.querySelector('.flip-top');
  flipBottom = card.querySelector('.flip-bottom');
  flipTop.textContent = top.textContent;
  flipBottom.textContent = newVal;
  card.classList.remove('play');
  _ = card.offsetWidth;
  card.classList.add('play');
  return setTimeout(function(){
    top.textContent = newVal;
    return bottom.textContent = newVal;
  }, 250);
};
updateDisplay = function(force){
  var idx, val, values, _i, _len, _results;
  force == null && (force = false);
  values = formatTime(state.remaining);
  _results = [];
  for (idx = _i = 0, _len = values.length; _i < _len; idx = ++_i) {
    val = values[idx];
    _results.push(flipTo(digits[slots[idx]], val, force));
  }
  return _results;
};
finish = function(){
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
  state.paused = false;
  if (state.endSound) {
    state.endSound.currentTime = 0;
    state.endSound.play();
  }
  return updatePauseButton();
};
updatePauseCount = function(){
  return document.getElementById('pause-count').textContent = state.pauseCount;
};
updatePauseButton = function(){
  var label, pauseBtn;
  pauseBtn = document.getElementById('pause-btn');
  label = pauseBtn.querySelector('.text');
  if (state.paused && !state.timer) {
    pauseBtn.classList.add('paused');
    return label.textContent = 'Resume';
  } else {
    pauseBtn.classList.remove('paused');
    return label.textContent = 'Pause';
  }
};
resetTimer = function(){
  if (state.timer) {
    clearInterval(state.timer);
  }
  state.remaining = TOTAL_SECONDS;
  state.timer = null;
  state.paused = false;
  state.pauseCount = 0;
  updateDisplay(true);
  updatePauseCount();
  return updatePauseButton();
};
startInterval = function(){
  return state.timer = setInterval(function(){
    if (state.remaining > 0) {
      state.remaining -= 1;
      updateDisplay();
      if (state.remaining === 0) {
        return finish();
      }
    }
  }, 1000);
};
pauseTimer = function(){
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
    state.paused = true;
    state.pauseCount += 1;
    updatePauseCount();
    return updatePauseButton();
  }
};
resumeTimer = function(){
  if (state.paused && !state.timer && state.remaining > 0) {
    startInterval();
    state.paused = false;
    return updatePauseButton();
  }
};
startPomodoro = function(){
  resetTimer();
  startInterval();
  return updatePauseButton();
};
setup = function(){
  slots.map(function(it){
    return digits[it] = document.querySelector("[data-slot=" + it + "]");
  });
  state.endSound = new Audio('audio/smb_mariodie.mp3');
  state.endSound.load();
  document.getElementById('tomato-btn').addEventListener('click', function(){
    return startPomodoro();
  });
  document.getElementById('pause-btn').addEventListener('click', function(){
    if (state.timer) {
      return pauseTimer();
    } else {
      return resumeTimer();
    }
  });
  document.getElementById('reset-btn').addEventListener('click', function(){
    return resetTimer();
  });
  updateDisplay(true);
  updatePauseCount();
  return updatePauseButton();
};
window.onload = function(){
  return setup();
};
