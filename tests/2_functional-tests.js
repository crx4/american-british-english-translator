/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

let Translator;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require('../public/translator.js');
  });

  suite('Function display()', () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
      
      const textArea = document.getElementById('text-input');
      const translationDiv = document.getElementById('translated-sentence');
      const output = '<span class="highlight">Colour</span> code is red.';

      textArea.value = 'Color code is red.';
      Translator.translate(textArea.value);

      assert.strictEqual(translationDiv.innerHTML, output);
      
      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      
      const textArea = document.getElementById('text-input');
      textArea.value = 'I miss my love.';
      const translationDiv = document.getElementById('translated-sentence');
      const output = 'Everything looks good to me!';

      Translator.translate(textArea.value);

      assert.strictEqual(translationDiv.textContent, output);
      
      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {

      const textArea = document.getElementById('text-input');
      textArea.value = '';
      const errorDiv = document.getElementById('error-msg');
      const output = 'Error: No text to translate.';

      Translator.translate(textArea.value);

      assert.strictEqual(errorDiv.textContent, output);
      
      done();
    });

  });

  suite('Function clear()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      const textArea = document.getElementById('text-input');
      const translationDiv = document.getElementById('translated-sentence');
      const errorDiv = document.getElementById('error-msg');

      textArea.value = "cozy";
      translationDiv.textContent = "cosy";

      errorDiv.textContent = 'Error: No text to translate.';

      Translator.clear();

      assert.strictEqual(textArea.value, '');
      assert.strictEqual(translationDiv.textContent, '');
      assert.strictEqual(errorDiv.textContent, '');
      
      done();
    });

  });

});
