TOTAL-SECONDS = 25 * 60

state =
  remaining: TOTAL-SECONDS
  timer: null
  end-sound: null
  pause-count: 0
  paused: false

digits = {}
slots = <[m-ten m-one s-ten s-one]>

format-time = (seconds) ->
  minutes = Math.floor seconds / 60
  secs = seconds % 60
  [Math.floor(minutes / 10), minutes % 10, Math.floor(secs / 10), secs % 10]

flip-to = (card, new-val, force=false) ->
  current = card.getAttribute \data-value
  if !force and current == String new-val => return
  card.setAttribute \data-value, new-val
  top = card.querySelector \.top
  bottom = card.querySelector \.bottom
  flip-top = card.querySelector \.flip-top
  flip-bottom = card.querySelector \.flip-bottom
  flip-top.textContent = top.textContent
  flip-bottom.textContent = new-val
  card.classList.remove \play
  _ = card.offsetWidth
  card.classList.add \play
  setTimeout (->
    top.textContent = new-val
    bottom.textContent = new-val
  ), 250

update-display = (force=false) ->
  values = format-time state.remaining
  for val, idx in values
    flip-to digits[slots[idx]], val, force

finish = ->
  if state.timer =>
    clearInterval state.timer
    state.timer := null
  state.paused := false
  if state.end-sound =>
    state.end-sound.currentTime = 0
    state.end-sound.play!

update-pause-count = ->
  document.getElementById('pause-count').textContent = state.pause-count

update-pause-button = ->
  pause-btn = document.getElementById('pause-btn')
  label = pause-btn.querySelector '.text'
  if state.paused and !state.timer
    pause-btn.classList.add 'paused'
    label.textContent = 'Resume'
  else
    pause-btn.classList.remove 'paused'
    label.textContent = 'Pause'

reset-timer = ->
  if state.timer =>
    clearInterval state.timer
  state.remaining := TOTAL-SECONDS
  state.timer := null
  state.paused := false
  state.pause-count := 0
  update-display true
  update-pause-count!
  update-pause-button!

start-interval = ->
  state.timer := setInterval ->
    if state.remaining > 0 =>
      state.remaining -= 1
      update-display!
      if state.remaining == 0 => finish!
  , 1000

pause-timer = ->
  if state.timer =>
    clearInterval state.timer
    state.timer := null
    state.paused := true
    state.pause-count += 1
    update-pause-count!
    update-pause-button!

resume-timer = ->
  if state.paused and !state.timer and state.remaining > 0 =>
    start-interval!
    state.paused := false
    update-pause-button!

start-pomodoro = ->
  reset-timer!
  start-interval!
  update-pause-button!

setup = ->
  slots.map -> digits[it] = document.querySelector "[data-slot=#{it}]"
  state.end-sound = new Audio 'audio/smb_mariodie.mp3'
  state.end-sound.load!
  document.getElementById('tomato-btn').addEventListener 'click', -> start-pomodoro!
  document.getElementById('pause-btn').addEventListener 'click', ->
    if state.timer
      pause-timer!
    else
      resume-timer!
  document.getElementById('reset-btn').addEventListener 'click', -> reset-timer!
  update-display true
  update-pause-count!
  update-pause-button!

window.onload = -> setup!
