import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

const dictionaries = {
  american: {},
  british: {}
};

Object.keys(americanOnly).forEach(key => dictionaries.american[key] = americanOnly[key]);
Object.keys(americanToBritishSpelling).forEach(key => dictionaries.american[key] = americanToBritishSpelling[key]);
Object.keys(americanToBritishTitles).forEach(
    key => dictionaries.american[key] = americanToBritishTitles[key].split('').map(
                (c, i) => i === 0 ? c.toUpperCase() : c
  ).join('')
)
Object.keys(britishOnly).forEach(key => dictionaries.american[britishOnly[key]] = key);

Object.keys(britishOnly).forEach(key => dictionaries.british[key] = britishOnly[key]);
Object.keys(americanToBritishSpelling).forEach(
  key => dictionaries.british[americanToBritishSpelling[key]] = key
);
Object.keys(americanToBritishTitles).forEach(
    key => dictionaries.british[
      americanToBritishTitles[key]
    ] = key.split('').map(
        (c, i) => i === 0 ? c.toUpperCase() : c
      ).join('')
)
Object.keys(americanOnly).forEach(
  key => dictionaries.british[americanOnly[key]] = key
);

const textArea = document.getElementById('text-input');
const translationDiv = document.getElementById('translated-sentence');
const errorDiv = document.getElementById('error-msg');
const translateButton = document.getElementById('translate-btn');
const clearButton = document.getElementById('clear-btn');
const targetSelection = document.getElementById('locale-select');

const highlight = translation => `<span class="highlight">${translation}</span>`;

const clear = () => {
  textArea.value = '';
  translationDiv.textContent = '';
  errorDiv.textContent = '';
}

const display = output => translationDiv.innerHTML = output;

const translate = (
  input = textArea.value, 
  fromLocale = 'american'
) => {

  errorDiv.textContent = '';

  if(input === '') {

    errorDiv.textContent = 'Error: No text to translate.';
    translationDiv.textContent = '';
    
    return 'Error: No text to translate.';
  }

  let initialInput = input;
  let translated = [];

  Object.keys(dictionaries[fromLocale]).forEach(
    key => {
      let regex = new RegExp(key, 'gi');
      
      
        input = input.replace(
          regex,
          function(word) {
            let result = dictionaries[fromLocale][key];
            if(translated.includes(result)) return word;
            
            if(input.search(word) === 0)
              result = result.split('').map(
                (c, i) => i === 0 ? c.toUpperCase() : c
              ).join('');

            translated.push(result);

            let location = input.search(word);
            if(! /\s|[^a-z]|^\./gi.test(input[location + word.length]))
              return word;

            if(word.charCodeAt(0) >= 65 && word.charCodeAt(0) <= 90)
              return highlight(result);
            
            return highlight(result);
          }
        );
    }
  );

  let timeRegex = fromLocale === 'american' ? 
    new RegExp('([0-9]+)(:)([0-9]+)', 'g') : 
    new RegExp('([0-9]+)(\.)([0-9]+)', 'g');
  input = input.replace(
    timeRegex,
    function(a, b, c, d) {
      let result = c === ':' ? b + '.' + d : b + ':' + d;
      return result;
    }
  );



  display(input === initialInput ? 'Everything looks good to me!' : input);
  return translationDiv.textContent;  
}

translateButton.addEventListener('click', () => translate() );
clearButton.addEventListener('click', () => clear() );

try {
  module.exports = {
    translate,
    clear,
    display
  }
} catch (e) {}
