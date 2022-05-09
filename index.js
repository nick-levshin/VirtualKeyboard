import { Keyboard } from './Keyboard.js';

const container = document.createElement('div');
container.classList.add('container');
document.body.prepend(container);

const textarea = document.createElement('textarea');
textarea.classList.add('text');
container.append(textarea);

const kb = new Keyboard();
kb.render(container);

window.addEventListener('keydown', (e) => kb.keyDown(e, 'keyboard'));

window.addEventListener('keyup', (e) => kb.keyUp(e));
