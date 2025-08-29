const apiUrl = 'https://jsonplaceholder.typicode.com/users';
let usuarios = [];

const cargarUsuarios = async () => {
  try {
    const { data } = await axios.get(apiUrl);
    usuarios = data;
    console.log(`Usuarios cargados: ${usuarios.length}`);
    console.log('Primera fila:', usuarios[0]);
    renderizarTabla(usuarios);
  } catch (error) {
    console.error('Error al cargar usuarios:', error.message);
  }
};

const renderizarTabla = lista => {
  const filas = lista.map(u => `
    <tr data-id="${u.id}">
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.company.name}</td>
    </tr>
  `).join('');
  $('#tabla tbody').html(filas);
};

const filtrarUsuarios = termino => {
  const filtrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(termino.toLowerCase())
  );
  console.log(`🔍 Filtro: "${termino}" → ${filtrados.length} coincidencias`);
  renderizarTabla(filtrados);
};

const mostrarDetalle = id => {
  const usuario = usuarios.find(u => u.id === Number(id));
  const { phone, address } = usuario;
  const direccion = `${address.street}, ${address.city}`;
  $('#detalle').html(`
    <strong>Teléfono:</strong> ${phone}<br>
    <strong>Dirección:</strong> ${direccion}<br>
    <button id="cerrar">Cerrar</button>
  `).show();
  console.log('📋 Detalle usuario:', usuario);
};

$(document).ready(() => {
  cargarUsuarios();

  $('#filtro').on('input', e => filtrarUsuarios(e.target.value));

  $('#tabla').on('click', 'tr', e => {
    const id = $(e.currentTarget).data('id');
    mostrarDetalle(id);
  });

  $('#detalle').on('click', '#cerrar', () => $('#detalle').hide());
});
