let socket;
let connected = false;

// console.log = console.error = (t) => $('html').append(t);

if ('webkitSpeechRecognition' in window) {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var recognition = new SpeechRecognition();
  var speechStarted = false;
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    console.log(event)
    if (event.results[event.resultIndex].isFinal) {
      const text = event.results[event.resultIndex][0].transcript.trim();
      if (connected && text && text.length >= 1) {
        socket.emit('user/say', {name: username, msg: text})
      }
    }
  }

  recognition.onstart = (e) => {
    speechStarted = true;
  }
  recognition.onsoundend = (e) => console.log(e);
  recognition.onspeechend = (e) => console.log(e);
  recognition.onaudioend = (e) => console.log(e);
  recognition.onerror = (e) => console.log(e);
  recognition.onend = (e) => {
    speechStarted = false;
    console.log(e);
  }

  setInterval(() => {
    if (!speechStarted) {
      recognition.start();
      console.log('attempting restart')
    }
  }, 100);
}

let roomId = null;
$(document).ready(() => {
  let params = new URLSearchParams(window.location.search);
  if (params.has('room')) {
    roomId = params.get('room')
    if (!roomId || roomId.length <= 0) {
      $('body').empty();
      $('body').append('missing room argument')    
    }
  } else {
    $('body').empty();
    $('body').append('missing room argument')
  }
})

$(document).on('click', '#submit', () => {
  let username = $('#username').val().trim();
  if (!username || username.length < 1) {
    alert("username too short")
    return;
  }
  socket = io.connect('/', {path: '/socket.io'});

  socket.emit('user/join', {name: username, roomId: roomId})

  socket.on('user/joined', (data) => {
    if (data.name === username) {
      $('.login input').prop('disabled', true)
      connected = true;
      addChat(data.name, 'has joined the chat!');
    }
  })

  socket.on('user/said', (data) => {
    addChat(data.name, data.msg.trim());
  })
})

function addChat(frm, text) {
  $('.chat').prepend('<tr><td><strong>' + frm + ':</strong></td><td>'+text+'</td></tr>')
}