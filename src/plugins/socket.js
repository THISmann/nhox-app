import socket from './services/socket';

export default {
  install: (app) => {
    // Injectez le socket dans l'application Vue
    app.config.globalProperties.$socket = socket;

    // Exemple d'écoute globalement :
    socket.on('server_message', (data) => {
      console.log('Message from server:', data);
    });
  },
};