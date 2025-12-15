// const socket = io();
// console.log(socket)
// socket.emit('message', 'Hello server');

// socket.on('reply', (msg) => {
//   console.log(msg);
// });
$(document).ready(() => {
  try {
    $('#staticBackdrop').modal('show');
    $('#join').on('click', () => {
      const name = $('#user-name').val();
      if (name === '') {
        return alert('Enter valid name');
      } else {
        const auth = {
          name: name,
          token: Math.floor(Math.random() * 1e10),
        };
        //connect
        const socket = io({
          auth: auth,
        });

        //I connected
        socket.on('user:connected', (res) => {
          $('#staticBackdrop').modal('hide');
          const userList = Object.values(res.userList);
          $('#ol-players').append('');
          userList.forEach((item) => {
            $('#ol-players').append(`
              <li>${item.name}</li>
              `);
          });
        });

        // //other user joined
        socket.on('user:join', (res) => {
          const userList = Object.values(res.userList);
          $('#ol-players').empty();
          userList.forEach((item) => {
            $('#ol-players').append(`
              <li>${item.name}</li>
              `);
          });
        });

        // //listen to broadcast
        // socket.on('user:disconnect', (res) => {
        //   console.log(`${res.name} disconnected`);
        // });
      }
    });
  } catch (e) {
    console.log(e);
  }
});
