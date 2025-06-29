// botones de control: maximizar, minimizar, cerrar
document.addEventListener('DOMContentLoaded', () =>{
  const openBtn = document.getElementById('chat-open');
  const restoreBtn = document.getElementById('restore-chat')
  const chatbot = document.getElementById('chatbot');
  const minimizeBtn = document.getElementById('minimize-chat');
  const closeBtn = document.getElementById('close-chat');
  const eraseBtn = document.getElementById('borrar-chat');
  //apertura del chatbot
  openBtn.addEventListener('click', ()=>{
    chatbot.classList.remove('hidden');
    openBtn.classList.add('hidden')
    document.getElementById('chatbot').style.display = "block";
  })

  //restaurar chatbot
  restoreBtn.addEventListener('click', ()=>{
    chatbot.classList.remove('hidden');
    openBtn.classList.add('hidden')
    document.getElementById('chat-window').style.height = '300px';
    document.getElementById('chat-header').style.display = 'block'
    document.getElementById('chat-body').style.display = 'block';//style es un metodo para incluir propiedades de css en nuestro codigo de javascript
    document.getElementById('chat-footer').style.display = 'flex';
    
  })


  //cierre del chatbot

  closeBtn.addEventListener('click', ()=>{
    // chatbot.classList.add('hidden');
    // openBtn.classList.remove('hidden');
    location.reload();
  })

  //minimizar 

  minimizeBtn.addEventListener('click', ()=>{
    if(chatbot.classList.contains('minimized')){
      chatbot.classList.remove('minimized');
      document.getElementById('chat-header').style.display = 'block'
      document.getElementById('chat-body').style.display = 'block';//style es un metodo para incluir propiedades de css en nuestro codigo de javascript
      document.getElementById('chat-footer').style.display = 'flex';
      document.getElementById('chat-window').style.height = '300px';

    }else{
      chatbot.classList.add('minimized')
      document.getElementById('chat-header').style.display = 'none';
      document.getElementById('chat-body').style.display = 'none';
      document.getElementById('chat-footer').style.display = 'none';
      document.getElementById('chat-window').style.height = '20%';
    }
  })

  //borrar chat

  eraseBtn.addEventListener('click', ()=>{
    document.getElementById('chat-body').textContent = ' ';
  })
})

//queda pendiente terminar el boton de minimizar


document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const chatBody = document.getElementById('chat-body');

  // Manejar click del botón
  sendButton.addEventListener('click', sendMessage);

  // Manejar Enter
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

  async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Mostrar el mensaje del usuario
    appendMessage('user', message);
    userInput.value = '';

    try {
      const response = await fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (data.reply) {
        appendMessage('bot', data.reply);
      } else {
        appendMessage('bot', 'Lo siento, no entendí eso.');
      }
    } catch (error) {
      appendMessage('bot', 'Error al conectarse con el bot.');
      console.error('Error:', error);
    }
  }

  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');


    if (sender === 'bot') {
      messageDiv.classList.add('message-bot');

      //color de fondo para la respuesta del chatbot
      messageDiv.style.backgroundColor = '#461699';
      
    }else if(sender === 'user'){
      //color de fondo para el mensaje de usuario
      messageDiv.style.background = 'blue';
    }


    messageDiv.textContent = text;

    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

});


