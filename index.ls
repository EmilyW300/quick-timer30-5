TOTAL-SECONDS = 25 * 60

state =
  remaining: TOTAL-SECONDS
  timer: null
  running: false
  pause-count: 0
  elapsed: 0
  end-sound: null

digit-elements = {}
slots = <[m-ten m-one s-ten s-one]>

format-time = (seconds) ->
  minutes = Math.floor seconds / 60
  secs = seconds % 60
  [Math.floor(minutes / 10), minutes % 10, Math.floor(secs / 10), secs % 10]

update-display = ->
  values = format-time state.remaining
  for val, idx in values
    digit-elements[slots[idx]].textContent = val

set-running = (is-running) ->
  state.running = is-running
  document.getElementById('pause-btn').classList.toggle 'active', !state.running and state.remaining != TOTAL-SECONDS
  document.getElementById('tomato-btn').classList.toggle 'active', state.running

apply-scene-progress = ->
  if state.elapsed >= 30 => document.body.classList.add 'show-moon'
  if state.elapsed >= 60 => document.body.classList.add 'show-sun'

reset-scenes = ->
  state.elapsed = 0
  document.body.classList.remove 'show-moon'
  document.body.classList.remove 'show-sun'

render-pause-squares = ->
  squares = document.getElementById 'pause-squares'
  squares.innerHTML = ''
  for i from 0 til state.pause-count
    squares.appendChild document.createElement 'span'

tick = ->
  if state.remaining > 0 =>
    state.remaining -= 1
    state.elapsed += 1
    apply-scene-progress!
    update-display!
    if state.remaining == 0 =>
      clearInterval state.timer
      state.timer := null
      set-running false
      if state.end-sound =>
        state.end-sound.currentTime = 0
        state.end-sound.play!

start-pomodoro = ->
  if state.timer => clearInterval state.timer
  reset-scenes!
  state.remaining = TOTAL-SECONDS
  update-display!
  set-running true
  state.timer := setInterval tick, 1000

pause-timer = ->
  return unless state.running and state.timer
  clearInterval state.timer
  state.timer := null
  state.running = false
  state.pause-count += 1
  render-pause-squares!
  set-running false

resume-timer = ->
  return if state.running or state.remaining <= 0
  state.timer := setInterval tick, 1000
  set-running true

restart-timer = ->
  if state.timer => clearInterval state.timer
  reset-scenes!
  state.remaining = TOTAL-SECONDS
  update-display!
  set-running false
  state.timer := null

setup = ->
  slots.map -> digit-elements[it] = document.querySelector "[data-slot=#{it}] .number"
  state.end-sound = new Audio 'audio/smb_mariodie.mp3'
  state.end-sound.load!
  document.getElementById('tomato-btn').addEventListener 'click', -> start-pomodoro!
  document.getElementById('pause-btn').addEventListener 'click', ->
    if state.running => pause-timer!
    else resume-timer!
  document.getElementById('restart-btn').addEventListener 'click', -> restart-timer!
  document.getElementById('reset-pauses').addEventListener 'click', ->
    state.pause-count = 0
    render-pause-squares!
  render-pause-squares!
  update-display!

window.onload = -> setup!
