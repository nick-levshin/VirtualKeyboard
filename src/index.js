/* eslint-disable */
import Keyboard from './Keyboard.js';
/* eslint-enable */

const container = document.createElement('div');
container.classList.add('container');
document.body.prepend(container);

const info = document.createElement('div');
const infoHTML = `
  <p>Проект разработан на операционной системе Linux Mint</p>
  <p>Сменить раскладку - Ctrl(left) + Alt(left)</p>
`;
info.classList.add('info');
info.insertAdjacentHTML('afterbegin', infoHTML);
container.append(info);

const textarea = document.createElement('textarea');
textarea.classList.add('text');
container.append(textarea);

const kb = new Keyboard();
kb.render(container);

window.addEventListener('keydown', (e) => kb.keyDown(e, 'keyboard'));

window.addEventListener('keyup', (e) => kb.keyUp(e));
