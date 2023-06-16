/*
 * Contamos la cantidad de opciones de cada select y segun el valor mostramos un cierto numero de opciones
 */

const ajustarSelects = () => {
  const selects = document.querySelectorAll('select');

  selects.forEach(select => {
    let cantOpciones = select.options.length;
    if (cantOpciones > 5) select.setAttribute('size', 5);
    else select.setAttribute('size', cantOpciones);
  });
}

export { ajustarSelects };