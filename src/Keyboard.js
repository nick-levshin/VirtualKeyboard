/* eslint-disable */
import { ru, en, ruU, enU, codes } from './language.js';
/* eslint-enable */

export default class Keyboard {
  constructor() {
    this.currentLanguage = JSON.parse(localStorage.getItem('currentLanguage')) || en;
  }

  render(element) {
    const keyboardHTML = `
      <div class="keyboard">
        <div class="row">
          ${this.generateKeys(this.currentLanguage.slice(0, 13))}
          <div class="key backspace">Backspace</div>
        </div>
        <div class="row">
          <div class="key tab">Tab</div>
          ${this.generateKeys(this.currentLanguage.slice(13, 26))}
        </div>
        <div class="row">
          <div class="key caps">Caps Lock</div>
          ${this.generateKeys(this.currentLanguage.slice(26, 37))}
          <div class="key enter">Enter</div>
        </div>
        <div class="row">
          <div class="key shift shift-left">Shift</div>
          ${this.generateKeys(this.currentLanguage.slice(37, 47))}
          <div class="key shift shift-right">Shift</div>
        </div>
        <div class="row">
          <div class="key ctrl ctrl-left">Ctrl</div>
          <div class="key del">Del</div>
          <div class="key win">Win</div>
          <div class="key alt alt-left">Alt</div>
          <div class="key space"></div>
          <div class="key alt alt-right">Alt</div>
          <div class="key ctrl ctrl-right">Ctrl</div>
          <div class="key">
            <div class="arrow arrow-left"></div>
          </div>
          <div class="up-down">
            <div class="key up">
              <div class="arrow arrow-up"></div>
            </div>
            <div class="key down">
              <div class="arrow arrow-down"></div>
            </div>
          </div>
          <div class="key">
            <div class="arrow arrow-right"></div>
          </div>
        </div>
      </div>
    `;

    element.insertAdjacentHTML('beforeend', keyboardHTML);

    this.initKeys();
  }

  /* eslint-disable */
  generateKeys(keys) {
  /* eslint-enable */
    let result = '';

    keys.forEach((key) => {
      result += `
        <div class="key" keyname="${key}">${key}</div>
      `;
    });

    return result;
  }

  initKeys() {
    this.keys = document.querySelectorAll('.key');
    this.textarea = document.querySelector('.text');

    for (let i = 0; i < this.keys.length; i += 1) {
      this.keys[i].addEventListener('mouseover', () => {
        this.keys[i].style.color = '#fff';
        this.keys[i].style.backgroundColor = '#353535';
      });
      this.keys[i].addEventListener('mouseout', () => {
        this.keys[i].style.color = '#000';
        this.keys[i].style.backgroundColor = '#fff';
      });
      this.keys[i].addEventListener('click', (e) => this.keyDown(e, 'mouse'));
      this.keys[i].setAttribute('id', codes[i]);
    }

    document.querySelectorAll('.ctrl').forEach((element) => {
      element.addEventListener('mousedown', (e) => this.mouseDown(e));
      element.addEventListener('mouseup', (e) => this.mouseUp(e));
    });
    document.querySelectorAll('.shift').forEach((element) => {
      element.addEventListener('mousedown', (e) => this.mouseDown(e));
      element.addEventListener('mouseup', (e) => this.mouseUp(e));
    });
    document.querySelectorAll('.alt').forEach((element) => {
      element.addEventListener('mousedown', (e) => this.mouseDown(e));
      element.addEventListener('mouseup', (e) => this.mouseUp(e));
    });
  }

  keyDown(e, type) {
    this.textarea.focus();

    if (type === 'keyboard') {
      if (e.code === 'CapsLock') {
        switch (this.currentLanguage[0]) {
          case ru[0]:
            localStorage.setItem('currentLanguage', JSON.stringify(ruU));
            break;

          case ruU[0]:
            localStorage.setItem('currentLanguage', JSON.stringify(ru));
            break;

          case en[0]:
            localStorage.setItem('currentLanguage', JSON.stringify(enU));
            break;

          case enU[0]:
            localStorage.setItem('currentLanguage', JSON.stringify(en));
            break;

          default: break;
        }

        this.currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
        this.remove();
        this.render(document.querySelector('.container'));

        document.getElementById(e.code).classList.add('active');
      } else if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        switch (this.currentLanguage[0]) {
          case ru[0]:
            localStorage.setItem('currentLanguage', JSON.stringify(ruU));
            break;

          case ruU[0]:
            localStorage.setItem('currentLanguage', JSON.stringify(ru));
            break;

          case en[0]:
            localStorage.setItem('currentLanguage', JSON.stringify(enU));
            break;

          case enU[0]:
            localStorage.setItem('currentLanguage', JSON.stringify(en));
            break;

          default: break;
        }

        this.currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
        this.remove();
        this.render(document.querySelector('.container'));

        document.getElementById(e.code).classList.add('active');
      } else if (e.code === 'Tab') {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        this.textarea.value = `${this.textarea.value.substring(0, start)}\t${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        document.getElementById(e.code).classList.add('active');
      } else if (e.code === 'ContextMenu') {
        e.preventDefault();
        document.getElementById(e.code).classList.add('active');
      } else if (!document.getElementById(e.code).hasAttribute('keyname')) {
        document.getElementById(e.code).classList.add('active');
      } else {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        this.textarea.value = `${this.textarea.value.substring(0, start)}${document
          .getElementById(e.code)
          .innerHTML.replace('&lt;', '<')
          .replace('&gt;', '>').replace('&amp;', '&')}${this.textarea.value.substring(end)}`;

        for (let i = 0; i < this.keys.length; i += 1) {
          if (e.code === this.keys[i].getAttribute('id')) {
            this.keys[i].classList.add('active');
            break;
          }
        }
      }
    } else {
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;
      const tmpKey = e.target.closest('.key');

      if (tmpKey.hasAttribute('keyname')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)}${tmpKey.getAttribute('keyname')}${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.classList.contains('backspace')) {
        this.textarea.value = this.textarea.value.substring(0, end - 1);
        return;
      }

      if (tmpKey.classList.contains('tab')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)}\t${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.classList.contains('enter')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)}\n${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.classList.contains('del')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)}${this.textarea.value.substring(start + 1)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.classList.contains('space')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)} ${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.querySelector('.arrow-left')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)}←${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.querySelector('.arrow-up')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)}↑${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.querySelector('.arrow-down')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)}↓${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.querySelector('.arrow-right')) {
        this.textarea.value = `${this.textarea.value.substring(0, start)}→${this.textarea.value.substring(end)}`;

        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
        return;
      }
    }

    if (
      document.getElementById('ControlLeft').classList.contains('active')
      && document.getElementById('AltLeft').classList.contains('active')
    ) {
      switch (this.currentLanguage[0]) {
        case ru[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(en));
          break;

        case ruU[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(enU));
          break;

        case en[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(ru));
          break;

        case enU[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(ruU));
          break;

        default: break;
      }

      this.currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
      this.remove();
      this.render(document.querySelector('.container'));
      document.getElementById('ControlLeft').classList.add('active');
      document.getElementById('AltLeft').classList.add('active');
    }
  }

  keyUp(e) {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      switch (this.currentLanguage[0]) {
        case ru[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(ruU));
          break;

        case ruU[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(ru));
          break;

        case en[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(enU));
          break;

        case enU[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(en));
          break;

        default: break;
      }

      this.currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
      this.remove();
      this.render(document.querySelector('.container'));

      document.getElementById(e.code).classList.remove('active');
    } else if (!document.getElementById(e.code).hasAttribute('keyname')) {
      document.getElementById(e.code).classList.remove('active');
    } else {
      for (let i = 0; i < this.keys.length; i += 1) {
        if (e.code === this.keys[i].getAttribute('id')) {
          this.keys[i].classList.remove('active');
          break;
        }
      }
    }
  }

  mouseDown(e) {
    if (
      e.target.closest('.key') === document.getElementById('ShiftLeft')
      || e.target.closest('.key') === document.getElementById('ShiftRight')
    ) {
      switch (this.currentLanguage[0]) {
        case ru[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(ruU));
          break;

        case ruU[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(ru));
          break;

        case en[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(enU));
          break;

        case enU[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(en));
          break;

        default: break;
      }
    } else if (
      e.target.closest('.key') === document.getElementById('AltLeft')
      && document.getElementById('ControlLeft').classList.contains('active')
    ) {
      switch (this.currentLanguage[0]) {
        case ru[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(en));
          break;

        case ruU[[0]]:
          localStorage.setItem('currentLanguage', JSON.stringify(enU));
          break;

        case en[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(ru));
          break;

        case enU[0]:
          localStorage.setItem('currentLanguage', JSON.stringify(ruU));
          break;

        default: break;
      }

      this.currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
      this.remove();
      this.render(document.querySelector('.container'));
      document.getElementById('ControlLeft').classList.add('active');
      return;
    }

    this.currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
    this.remove();
    this.render(document.querySelector('.container'));
  }

  mouseUp(e) {
    if (
      e.target.closest('.key') === document.getElementById('ShiftLeft')
      || e.target.closest('.key') === document.getElementById('ShiftRight')
    ) {
      switch (this.currentLanguage[0]) {
        case ru[0]:
          this.currentLanguage = ruU;
          break;

        case ruU[0]:
          this.currentLanguage = ru;
          break;

        case en[0]:
          this.currentLanguage = enU;
          break;

        case enU[0]:
          this.currentLanguage = en;
          break;

        default: break;
      }
      this.remove();
      this.render(document.querySelector('.container'));
    }
  }

  remove() {
    this.keyboard = document.querySelector('.keyboard');
    this.keyboard.remove();
  }
}
