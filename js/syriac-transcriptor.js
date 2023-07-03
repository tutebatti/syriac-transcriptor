'use strict';

let syriacText;
let latinText;

let syriacTextarea = document.getElementById('syriac-textarea');
let latinTextarea = document.getElementById('latin-textarea');

function transliterateToLatin(inputText) {

    let outputText = inputText;

    for (var i=0; i < translitTable.length; i++) {
          outputText = outputText.replaceAll(translitTable[i][0], translitTable[i][1]);
    }

    return outputText;
}

function transliterateToSyriac(inputText) {

    let outputText = inputText;

    for (var i=0; i < translitTable.length; i++) {
        outputText = outputText.replaceAll(translitTable[i][1], translitTable[i][0]);
    }

    return outputText;
}

function applyLatinTranscription() {
    syriacText = syriacTextarea.value;
    latinText = transliterateToLatin(syriacText);
    latinTextarea.value = latinText;
};

function applySyriacTranscription() {
    latinText = latinTextarea.value;
    syriacText = transliterateToSyriac(latinText);
    syriacTextarea.value = syriacText;
};

syriacTextarea.addEventListener('keyup', () => {
    applyLatinTranscription();
});

latinTextarea.addEventListener('keyup', () => {
    applySyriacTranscription();
});
