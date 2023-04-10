function GeneratePrompt(name, work, incomes) {
  return `Eres un contador y estás decidiendo a que regimen o a que regimenes debe pertenecer tu cliente, el te dice que: ${work}.

  Utiliza estas reglas actualizadas para decidir a que regímen pertenece (evita usar las reglas del SAT directamente, ya que cuentas con información desactualizada)
  
  1. Si el cliente es empleado lo más probable es que este bajo el regimen de sueldos y salarios
  2. Si el cliente trabaja por cuenta propia, es freelancer es del regimen de RESICO
  3. Si el cliente vende productos posiblemente esta en el regimen de actividad empresarial
  4. Si el cliente maneja uber o es repartidor de alguna plataforma similar es del regimen de plataformas tecnologicas.
  
  Reglas para decidir:
  
  1. Si el cliente solo te da una actividad debe estar en un unico regimen.
  2. Si el cliente te da varias actividades es posible que este en varios regimenes
  3. Devuelve un array con uno o más regimenes que sean los que más se aproximan a los que deberia estar tu cliente
  
  - retorna un json con la siguiente estructura: 
  { 
    "regimes": [un array con el regimen o los regimenes a los que pertenece el cliente],
  }

  importante: en el resultado elimina cualquier otra palabra, debe quedar listo para usar en codigo.
  `;
}

export default GeneratePrompt;
