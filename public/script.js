//1.chatbot



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
      const response = await fetch('/api/send-message', {
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

//----------fin de script para chatbot------------


//2. formulario


const datos = {
  nombre: '',
  telefono: '',
  correo: '',
  mensaje: ''
};

const nombre = document.querySelector('#nombre');
const telefono = document.querySelector('#telefono');
const correo = document.querySelector('#correo');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('.formulario');

nombre.addEventListener('input', leerTexto);
telefono.addEventListener('input', leerTexto);
correo.addEventListener('input', leerTexto);
mensaje.addEventListener('input', leerTexto);
formulario.addEventListener('submit', enviarFormulario)

//submit o enviar formulario
function enviarFormulario(evento){
  evento.preventDefault();

  //validar formulario

  const { nombre, telefono, correo, mensaje } = datos


  if(nombre === '' || telefono === '' || correo === '', mensaje === ''){
    mostrarError('Todos los campos son obligatorio')
    return;
  }

   mostrarAcierto('Formulario Enviado ✅');

   console.log('Enviando formulario')
}



//mostrar envio exitoso o mostrar error

function mostrarError(mensaje){
  const error = document.createElement('P')
  error.textContent = mensaje
  error.classList.add('error');

  console.log(error);

  formulario.appendChild(error)

  //desaparecer en cinco segundos el mensaje de error

  setTimeout(() => {
    error.remove();
  }, 5000);
}

function mostrarAcierto(mensaje){
  const acierto = document.createElement('P')
  acierto.textContent = mensaje
  acierto.classList.add('acierto');

  console.log(acierto);

  formulario.appendChild(acierto)

  //desaparecer en cinco segundos el mensaje de acierto

  setTimeout(() => {
    acierto.remove();
  }, 5000);
}


function leerTexto(evento){
  datos[evento.target.id] = evento.target.value
  console.log(datos);
}
