let message = require('message');

let foo = 'world';
let el = document.getElementById('content');
el.textContent = message.buildMessage(foo);
