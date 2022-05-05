import { ru, en } from './language.js';

let currentLanguage = en;

const radios = `

`;

const keyboard = `
  <div class="keyboard">
    <div class="row">
      <div class="keys">
        <div class="key sign">~</div>
        <div class="key">\`</div>
      </div>
      <div class="keys">
        <div class="key sign">!</div>
        <div class="key">1</div>
      </div>
      <div class="keys">
        <div class="key sign">@</div>
        <div class="key">2</div>
      </div>
      <div class="keys">
        <div class="key sign">#</div>
        <div class="key">3</div>
      </div>
      <div class="keys">
        <div class="key sign">$</div>
        <div class="key">4</div>
      </div>
      <div class="keys">
        <div class="key sign">%</div>
        <div class="key">5</div>
      </div>
      <div class="keys">
        <div class="key sign">^</div>
        <div class="key">6</div>
      </div>
      <div class="keys">
        <div class="key sign">&</div>
        <div class="key">7</div>
      </div>
      <div class="keys">
        <div class="key sign">*</div>
        <div class="key">8</div>
      </div>
      <div class="keys">
        <div class="key sign">(</div>
        <div class="key">9</div>
      </div>
      <div class="keys">
        <div class="key sign">)</div>
        <div class="key">0</div>
      </div>
      <div class="keys">
        <div class="key sign">_</div>
        <div class="key">-</div>
      </div>
      <div class="keys">
        <div class="key sign">+</div>
        <div class="key">=</div>
      </div>
      <div class="keys backspace">
        <div class="key">Backspace</div>
      </div>
    </div>
    <div class="row">
      <div class="keys tab">
        <div class="key">Tab</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[0]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[1]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[2]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[3]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[4]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[5]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[6]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[7]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[8]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[9]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[10]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[11]}</div>
      </div>
      <div class="keys slash">
        <div class="key sign">|</div>
        <div class="key">\\</div>
      </div>
    </div>
    <div class="row">
      <div class="keys caps">
        <div class="key">Caps Lock</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[12]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[13]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[14]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[15]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[16]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[17]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[18]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[19]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[20]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[21]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[22]}</div>
      </div>
      <div class="keys enter">
        <div class="key">Enter</div>
      </div>
    </div>
    <div class="row">
      <div class="keys shift">
        <div class="key">Shift</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[23]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[24]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[25]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[26]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[27]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[28]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[29]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[30]}</div>
      </div>
      <div class="keys">
        <div class="key">${currentLanguage[31]}</div>
      </div>
      <div class="keys">
        <div class="key sign">?</div>
        <div class="key">/</div>
      </div>
      <div class="keys shift">
        <div class="key">Shift</div>
      </div>
    </div>
    <div class="row">
      <div class="keys">
        <div class="key ctrl">Ctrl</div>
      </div>
      <div class="keys">
        <div class="key">Fn</div>
      </div>
      <div class="keys">
        <div class="key">Win</div>
      </div>
      <div class="keys">
        <div class="key alt">Alt</div>
      </div>
      <div class="keys">
        <div class="key space"></div>
      </div>
      <div class="keys">
        <div class="key alt">Alt</div>
      </div>
      <div class="keys">
        <div class="key ctrl">Ctrl</div>
      </div>
      <div class="keys">
        <div class="key arrow arrow-left"></div>
      </div>
      <div class="up-down">
        <div class="keys up">
          <div class="key arrow arrow-up"></div>
        </div>
        <div class="keys down">
          <div class="key arrow arrow-down"></div>
        </div>
      </div>
      <div class="keys">
        <div class="key arrow arrow-right"></div>
      </div>
    </div>
  </div>
`;

const container = document.createElement('div');
container.classList.add('container');
document.body.prepend(container);

container.insertAdjacentHTML('afterbegin', keyboard);
