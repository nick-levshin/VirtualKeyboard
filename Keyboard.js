import { ru, en, ruU, enU, codes } from './language.js';

export class Keyboard {
  constructor() {
    this.currentLanguage = en;
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

  generateKeys(keys) {
    let result = '';

    keys.forEach((key) => {
      result += `
        <div class="key" keyname="${key}">${key}</div>
      `;
    });

    return result;
  }

  initKeys() {
    // this.keyboard = document.querySelector('.keyboard');
    this.keys = document.querySelectorAll('.key');
    // this.space = document.querySelector('.space');
    // this.shiftLeft = document.querySelector('.shift-left');
    // this.shiftRight = document.querySelector('.shift-right');
    // this.altLeft = document.querySelector('.alt-left');
    // this.altRight = document.querySelector('.alt-right');
    // this.ctrlLeft = document.querySelector('.ctrl-left');
    // this.ctrlRight = document.querySelector('.ctrl-right');
    // this.caps = document.querySelector('.caps');
    // this.tab = document.querySelector('.tab');
    // this.del = document.querySelector('.del');
    // this.arrowLeft = document.querySelector('.left');
    // this.arrowUp = document.querySelector('.up');
    // this.arrowDown = document.querySelector('.down');
    // this.arrowRight = document.querySelector('.right');
    this.textarea = document.querySelector('.text');
    // this.enter = document.querySelector('.enter');
    // this.backspace = document.querySelector('.backspace');

    for (let i = 0; i < this.keys.length; i++) {
      this.keys[i].addEventListener('mouseover', () =>
        this.keys[i].classList.add('active')
      );
      this.keys[i].addEventListener('mouseout', () =>
        this.keys[i].classList.remove('active')
      );
      this.keys[i].addEventListener('click', (e) => this.keyDown(e, 'mouse'));
      this.keys[i].setAttribute('id', codes[i]);
    }
  }

  keyDown(e, type) {
    this.textarea.focus();

    if (type === 'keyboard') {
      if (e.code === 'CapsLock') {
        switch (this.currentLanguage) {
          case ru:
            this.currentLanguage = ruU;
            break;

          case ruU:
            this.currentLanguage = ru;
            break;

          case en:
            this.currentLanguage = enU;
            break;

          case enU:
            this.currentLanguage = en;
            break;
        }

        this.remove();
        this.render(document.querySelector('.container'));

        document.getElementById(e.code).classList.add('active');
      }

      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        switch (this.currentLanguage) {
          case ru:
            this.currentLanguage = ruU;
            break;

          case ruU:
            this.currentLanguage = ru;
            break;

          case en:
            this.currentLanguage = enU;
            break;

          case enU:
            this.currentLanguage = en;
            break;
        }

        this.remove();
        this.render(document.querySelector('.container'));

        document.getElementById(e.code).classList.add('active');
      }
      if (e.code === 'Tab') {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        this.textarea.value =
          this.textarea.value.substring(0, start) +
          '\t' +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
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

        this.textarea.value =
          this.textarea.value.substring(0, start) +
          document.getElementById(e.code).innerHTML +
          this.textarea.value.substring(end);

        for (let i = 0; i < this.keys.length; i++) {
          if (e.key === this.keys[i].getAttribute('keyname'))
            this.keys[i].classList.add('active');
        }
      }
    } else {
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;
      const tmpKey = e.target.closest('.key');

      if (tmpKey.hasAttribute('keyname')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          tmpKey.getAttribute('keyname') +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.classList.contains('backspace')) {
        this.textarea.value = this.textarea.value.substring(0, end - 1);
        return;
      }

      if (tmpKey.classList.contains('tab')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          '\t' +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.classList.contains('enter')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          '\n' +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.classList.contains('del')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          this.textarea.value.substring(start + 1);

        this.textarea.selectionStart = this.textarea.selectionEnd = start;
        return;
      }

      if (tmpKey.classList.contains('space')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          ' ' +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.querySelector('.arrow-left')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          '←' +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.querySelector('.arrow-up')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          '↑' +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.querySelector('.arrow-down')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          '↓' +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
        return;
      }

      if (tmpKey.querySelector('.arrow-right')) {
        this.textarea.value =
          this.textarea.value.substring(0, start) +
          '→' +
          this.textarea.value.substring(end);

        this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
        return;
      }
    }
  }

  keyUp(e) {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      switch (this.currentLanguage) {
        case ru:
          this.currentLanguage = ruU;
          break;

        case ruU:
          this.currentLanguage = ru;
          break;

        case en:
          this.currentLanguage = enU;
          break;

        case enU:
          this.currentLanguage = en;
          break;
      }

      this.remove();
      this.render(document.querySelector('.container'));

      document.getElementById(e.code).classList.remove('active');
    } else if (!document.getElementById(e.code).hasAttribute('keyname'))
      document.getElementById(e.code).classList.remove('active');
    else
      for (let i = 0; i < this.keys.length; i++) {
        if (e.key === this.keys[i].getAttribute('keyname'))
          this.keys[i].classList.remove('active');
      }
  }

  countletterInString() {
    const split = this.textarea.value.split('\n').map((line) => {
      if (line.length > 79) {
        let { length } = line;
        const countStr = [];
        while (length > 79) {
          countStr.push(79);
          length -= 79;
        }
        if (length > 0) {
          countStr.push(length);
        }
        return countStr;
      }
      return line.length;
    });
    const result = split.flat();
    return result;
  }

  remove() {
    document.querySelector('.keyboard').remove();
  }
}
