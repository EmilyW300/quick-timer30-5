var TOTAL_SECONDS, state, digitElements, slots, formatTime, updateDisplay, setRunning, startPomodoro, pauseTimer, resumeTimer, restartTimer, tick, applySceneProgress, resetScenes, renderPauseSquares, setup;

TOTAL_SECONDS = 25 * 60;

state = {
  remaining: TOTAL_SECONDS,
  timer: null,
  running: false,
  pauseCount: 0,
  elapsed: 0,
  endSound: null
};

digitElements = {};

slots = ['m-ten', 'm-one', 's-ten', 's-one'];

formatTime = function(seconds){
  var minutes, secs;
  minutes = Math.floor(seconds / 60);
  secs = seconds % 60;
  return [Math.floor(minutes / 10), minutes % 10, Math.floor(secs / 10), secs % 10];
};

updateDisplay = function(){
  var idx, val, values, _i, _len, _results;
  values = formatTime(state.remaining);
  _results = [];
  for (idx = _i = 0, _len = values.length; _i < _len; idx = ++_i) {
    val = values[idx];
    _results.push(digitElements[slots[idx]].textContent = val);
  }
  return _results;
};

setRunning = function(isRunning){
  state.running = isRunning;
  document.getElementById('pause-btn').classList.toggle('active', !state.running && state.remaining !== TOTAL_SECONDS);
  return document.getElementById('tomato-btn').classList.toggle('active', state.running);
};

applySceneProgress = function(){
  if (state.elapsed >= 30) {
    document.body.classList.add('show-moon');
  }
  if (state.elapsed >= 60) {
    return document.body.classList.add('show-sun');
  }
};

resetScenes = function(){
  state.elapsed = 0;
  document.body.classList.remove('show-moon');
  return document.body.classList.remove('show-sun');
};

renderPauseSquares = function(){
  var i, squares, _i, _results;
  squares = document.getElementById('pause-squares');
  squares.innerHTML = '';
  _results = [];
  for (i = _i = 0; 0 <= state.pauseCount ? _i < state.pauseCount : _i > state.pauseCount; i = 0 <= state.pauseCount ? ++_i : --_i) {
    _results.push(squares.appendChild(document.createElement('span')));
  }
  return _results;
};

tick = function(){
  if (state.remaining > 0) {
    state.remaining -= 1;
    state.elapsed += 1;
    applySceneProgress();
    updateDisplay();
    if (state.remaining === 0) {
      clearInterval(state.timer);
      state.timer = null;
      setRunning(false);
      if (state.endSound) {
        state.endSound.currentTime = 0;
        return state.endSound.play();
      }
    }
  }
};

startPomodoro = function(){
  if (state.timer) {
    clearInterval(state.timer);
  }
  resetScenes();
  state.remaining = TOTAL_SECONDS;
  updateDisplay();
  setRunning(true);
  return state.timer = setInterval(tick, 1000);
};

pauseTimer = function(){
  if (!state.running || !state.timer) {
    return;
  }
  clearInterval(state.timer);
  state.timer = null;
  state.running = false;
  state.pauseCount += 1;
  renderPauseSquares();
  return setRunning(false);
};

resumeTimer = function(){
  if (state.running || state.remaining <= 0) {
    return;
  }
  state.timer = setInterval(tick, 1000);
  return setRunning(true);
};

restartTimer = function(){
  if (state.timer) {
    clearInterval(state.timer);
  }
  resetScenes();
  state.remaining = TOTAL_SECONDS;
  updateDisplay();
  setRunning(false);
  return state.timer = null;
};

setup = function(){
  slots.map(function(it){
    return digitElements[it] = document.querySelector("[data-slot=" + it + "] .number");
  });
  state.endSound = new Audio('audio/smb_mariodie.mp3');
  state.endSound.load();
  document.getElementById('tomato-btn').addEventListener('click', function(){
    return startPomodoro();
  });
  document.getElementById('pause-btn').addEventListener('click', function(){
    if (state.running) {
      return pauseTimer();
    } else {
      return resumeTimer();
    }
  });
  document.getElementById('restart-btn').addEventListener('click', function(){
    return restartTimer();
  });
  document.getElementById('reset-pauses').addEventListener('click', function(){
    state.pauseCount = 0;
    return renderPauseSquares();
  });
  renderPauseSquares();
  return updateDisplay();
};

window.onload = function(){
  return setup();
};
