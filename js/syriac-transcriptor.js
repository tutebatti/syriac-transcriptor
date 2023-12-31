'use strict';

let syriacText;
let latinText;

let syriacTextarea = document.getElementById('syriac-textarea');
let syriacHighlights = document.getElementById('syriac-highlights');

let latinTextarea = document.getElementById('latin-textarea');
let latinHighlights = document.getElementById('latin-highlights');

let logOutput = document.getElementById('log-output');

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
    syriacHighlights.innerHTML = syriacTextarea.value;
    latinText = transliterateToLatin(syriacText);
    latinTextarea.value = latinText;
    latinHighlights.innerHTML = latinText;
};

function applySyriacTranscription() {
    latinText = latinTextarea.value;
    latinHighlights.innerHTML = latinTextarea.value;
    syriacText = transliterateToSyriac(latinText);
    syriacTextarea.value = syriacText;
    syriacHighlights.innerHTML = syriacText;
};

syriacTextarea.addEventListener('keyup', () => {
    applyLatinTranscription();
});

latinTextarea.addEventListener('keyup', () => {
    applySyriacTranscription();
});

function getSelection() {
    syriacText = syriacTextarea.value;
    latinText = latinTextarea.value;

    let txtarea = document.activeElement;

    let selectionStart = txtarea.selectionStart;
    let selectionEnd = txtarea.selectionEnd;

    let selectionText = [syriacText.substring(selectionStart, selectionEnd), '<br/><br/>', latinText.substring(selectionStart, selectionEnd)].join('');

    let highlightedSyriacText = [syriacText.slice(0, selectionStart), '<mark>', syriacText.slice(selectionStart, selectionEnd), '</mark>', syriacText.slice(selectionEnd)].join('');
    let highlightedLatinText = [latinText.slice(0, selectionStart), '<mark>', latinText.slice(selectionStart, selectionEnd), '</mark>', latinText.slice(selectionEnd)].join('');

    syriacHighlights.innerHTML = highlightedSyriacText;
    latinHighlights.innerHTML = highlightedLatinText;

    logOutput.innerHTML = selectionText;
}

syriacTextarea.addEventListener('click', getSelection);
latinTextarea.addEventListener('click', getSelection);

document.getElementById("one-to-one-transcription").addEventListener('click', () => {
    applyLatinTranscription();
});

  document.getElementById("eastern-transcription").addEventListener('click', () => {
    applyLatinTranscription();
});

  document.getElementById("western-transcription").addEventListener('click', () => {
    applyLatinTranscription();
});
