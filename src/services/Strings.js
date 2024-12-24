const wordsAndTranslations = [
  { name: 'aguila', translate: 'eagle', fixEspanish: 'águila' },
  { name: 'elefante', translate: 'elephant', fixEspanish: '' },
  { name: 'iguana', translate: 'iguana', fixEspanish: '' },  
  { name: 'oso', translate: 'bear', fixEspanish: '' },
  { name: 'urraca', translate: 'magpie', fixEspanish: '' },
  { name: 'hipopotamo', translate: 'hippo', fixEspanish: '' },
  { name: 'jirafa', translate: 'giraffe', fixEspanish: '' },
  { name: 'leon', translate: 'lion', fixEspanish: 'león' },
  { name: 'tigre', translate: 'tiger', fixEspanish: '' },
  { name: 'zebra', translate: 'zebra', fixEspanish: '' },
];

export function removeAccents(str) {
  return str
    .normalize("NFD") // Separa caracteres base de sus diacríticos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
    .replace(/ñ/g, "ñ") // Asegura que las "ñ" no sean modificadas
    .replace(/Ñ/g, "Ñ"); // Asegura que las "Ñ" no sean modificadas
}

export function capitaliceWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getTranslate(word) {
  const wordLowerCase = removeAccents(word.toLowerCase()).replaceAll(' ','');
  const found = wordsAndTranslations.find(item => 
    removeAccents(item.name.toLowerCase()).replaceAll(' ','') === wordLowerCase
  );
  return found ? capitaliceWord(found.translate) : null;
}

export function validateFix(word) {
  const wordLowerCase = word.toLowerCase();
  let valueReturn = null;
  const found = wordsAndTranslations.find(item => item.name.toLowerCase() === wordLowerCase);
  if (found) {
    let value = found.name;
    if (found.fixEspanish != '') {
      value = found.fixEspanish;
    }    
    valueReturn = capitaliceWord(value);
  }
  return valueReturn;
}