// Variables globales
const historial = [];

// Función para mostrar el resultado
function mostrarResultado(resultado) {
  document.getElementById('resultado-valor').textContent = resultado;
}

// Función para mostrar error
function mostrarError(mensaje) {
  const errorDiv = document.getElementById('error-mensaje');
  errorDiv.textContent = mensaje;
  setTimeout(() => {
    errorDiv.textContent = '';
  }, 3000);
}

// Función para limpiar campos
function limpiarCampos() {
  document.getElementById('num1').value = '';
  document.getElementById('num2').value = '';
  document.getElementById('operacion').value = '+';
  mostrarResultado('-');
  document.getElementById('num1').focus();
}

// Función principal de cálculo
function calcular() {
  // Obtener valores de los inputs
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const operacionSelect = document.getElementById('operacion');
  
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  const operacion = operacionSelect.value;

  console.log('Calculando:', num1, operacion, num2);

  // Validaciones básicas
  if (num1Input.value === '' || num2Input.value === '') {
    mostrarError('Por favor, completa ambos campos');
    return;
  }

  if (isNaN(num1) || isNaN(num2)) {
    mostrarError('Por favor, ingresa números válidos');
    return;
  }

  if (operacion === '/' && num2 === 0) {
    mostrarError('No se puede dividir por cero');
    return;
  }

  // Realizar la operación
  let resultado;
  let operacionTexto;
  
  switch (operacion) {
    case '+':
      resultado = num1 + num2;
      operacionTexto = 'suma';
      break;
    case '-':
      resultado = num1 - num2;
      operacionTexto = 'resta';
      break;
    case '*':
      resultado = num1 * num2;
      operacionTexto = 'multiplicación';
      break;
    case '/':
      resultado = num1 / num2;
      operacionTexto = 'división';
      break;
    default:
      mostrarError('Operación no válida');
      return;
  }

  // Formatear resultado (máximo 2 decimales si es necesario)
  const resultadoFormateado = Number.isInteger(resultado) ? 
    resultado : resultado.toFixed(2);

  // Mostrar resultado
  mostrarResultado(resultadoFormateado);
  
  // Guardar en historial (solo para referencia, no se muestra)
  historial.push(`${num1} ${operacion} ${num2} = ${resultadoFormateado}`);
  console.log('Historial:', historial);
  
  console.log(`Resultado de la ${operacionTexto}: ${resultadoFormateado}`);
}

// Configurar event listeners cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Botón calcular
  document.getElementById('calcular').addEventListener('click', calcular);
  
  // Botón limpiar
  document.getElementById('limpiar').addEventListener('click', limpiarCampos);
  
  // Permitir calcular con Enter
  document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      calcular();
    }
  });
  
  // Focus en el primer input al cargar
  document.getElementById('num1').focus();
  
  console.log('✅ Calculadora sencilla cargada correctamente');
});
