function GeneratePrompt(name, work, incomes) {
  return `Imagina que eres un contador de impuestos de México y quieres saber cual es el régimen en el que se deberia encontrar tu cliente en base a esta respuesta: ${work}, RIF(Regimen de incorporacion fiscal) ya no es un régimen vigente siempre descarta esta opcion.

  Describe en que regimenes se podría encontrar el usuario y por que brevemente.

Importante: solo devuelve el json, no necesito explicacion de como funciona.
  `;
}

export default GeneratePrompt;
