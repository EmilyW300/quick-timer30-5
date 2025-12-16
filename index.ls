TOTAL-SECONDS = 25 * 60

state =
  remaining: TOTAL-SECONDS
  timer: null
  end-sound: null

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
  if state.end-sound =>
    state.end-sound.currentTime = 0
    state.end-sound.play!

reset-timer = ->
  if state.timer =>
    clearInterval state.timer
  state.remaining := TOTAL-SECONDS
  state.timer := null

start-pomodoro = ->
  reset-timer!
  update-display true
  state.timer := setInterval ->
    if state.remaining > 0 =>
      state.remaining -= 1
      update-display!
      if state.remaining == 0 => finish!
  , 1000

setup = ->
  slots.map -> digits[it] = document.querySelector "[data-slot=#{it}]"
  state.end-sound = new Audio 'audio/smb_mariodie.mp3'
  state.end-sound.load!
  document.getElementById('tomato-btn').addEventListener 'click', -> start-pomodoro!
  update-display true

window.onload = -> setup!
