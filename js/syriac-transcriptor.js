'use strict';

let syriacText;
let latinText;

let syriacTextarea = document.getElementById('syriac-textarea');
let latinTextarea = document.getElementById('latin-textarea');

let transcriptionOption = document.querySelector('input[name = "transcription-option"]:checked').value;

function transliterateToLatin(inputText) {

    let outputText = inputText;

    let translitTable;

    transcriptionOption = document.querySelector('input[name = "transcription-option"]:checked').value;

    switch (transcriptionOption) {
      case 'one-to-one':
        translitTable = translitOneToOne;
        break;
      case 'eastern-vowels':
        translitTable = translitEastern;
        break;
      case 'western-vowels':
        translitTable = translitWestern;
    }

    for (var i=0; i < translitTable.length; i++) {
          outputText = outputText.replaceAll(translitTable[i][0], translitTable[i][1]);
    }

    return outputText;
}

function transliterateToSyriac(inputText) {

    let outputText = inputText;

    let translitTable;

    transcriptionOption = document.querySelector('input[name = "transcription-option"]:checked').value;

    switch (transcriptionOption) {
      case 'one-to-one':
        translitTable = translitOneToOne;
        break;
      case 'eastern-vowels':
        translitTable = translitEastern;
        break;
      case 'western-vowels':
        translitTable = translitWestern;
    }

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

document.getElementById("one-to-one-transcription").addEventListener('click', () => {
    applyLatinTranscription();
  });

  document.getElementById("eastern-transcription").addEventListener('click', () => {
    applyLatinTranscription();
  });

  document.getElementById("western-transcription").addEventListener('click', () => {
    applyLatinTranscription();
  });
