import buildMessage from './message';

let foo = 'world';
let el = document.getElementById('content');
el.textContent = buildMessage(foo);
