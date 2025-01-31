const wordsAndTranslations = [

  // nivel facil
  { name: 'hormiga', translate: 'ant', fixEspanish: '' },
  { name: 'murcielago', translate: 'bat', fixEspanish: 'murciélago' },
  { name: 'gato', translate: 'cat', fixEspanish: '' },
  { name: 'perro', translate: 'dog', fixEspanish: '' },
  { name: 'buho', translate: 'owl', fixEspanish: 'búho' },
  { name: 'cerdo', translate: 'pig', fixEspanish: '' },
  { name: 'rata', translate: 'rat', fixEspanish: '' },
  { name: 'zorro', translate: 'fox', fixEspanish: '' },

  //nivel normal
  { name: 'aguila', translate: 'eagle', fixEspanish: 'águila' },
  { name: 'rana', translate: 'frog', fixEspanish: '' },
  { name: 'caballo', translate: 'horse', fixEspanish: '' },
  { name: 'mono', translate: 'monkey', fixEspanish: '' },
  { name: 'tigre', translate: 'tiger', fixEspanish: '' },
  { name: 'leon', translate: 'lion', fixEspanish: 'león' },
  { name: 'hipopotamo', translate: 'hippo', fixEspanish: 'hipopótamo' },
  { name: 'iguana', translate: 'iguana', fixEspanish: '' },  
  { name: 'oso', translate: 'bear', fixEspanish: '' },
  { name: 'zebra', translate: 'zebra', fixEspanish: '' },


  //nivel dificil
  { name: 'caiman', translate: 'alligator', fixEspanish: 'caimán' },
  { name: 'armadillo', translate: 'armadillo', fixEspanish: '' },
  { name: 'elefante', translate: 'elephant', fixEspanish: '' },
  { name: 'urraca', translate: 'magpie', fixEspanish: '' },  
  { name: 'jirafa', translate: 'giraffe', fixEspanish: '' },
  { name: 'mariposa', translate: 'butterfly', fixEspanish: '' },
  { name: 'cucaracha', translate: 'cockroach', fixEspanish: '' },
  { name: 'canguro', translate: 'Kangaroo', fixEspanish: '' },
  { name: 'puercoespin', translate: 'porcupine', fixEspanish: 'puercoespín' },
  { name: 'serpiente', translate: 'snake', fixEspanish: '' },
  { name: 'escorpion', translate: 'scorpion', fixEspanish: 'escorpión' },
  { name: 'ardilla', translate: 'squirrel', fixEspanish: '' },
  { name: 'araña', translate: 'spider', fixEspanish: '' },
  { name: 'mariquita', translate: 'ladybug', fixEspanish: '' },
  { name: 'saltamontes', translate: 'grasshopper', fixEspanish: '' },
  { name: 'colibri', translate: 'hummingbird', fixEspanish: 'colibrí' },
  


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