import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [titulo, setTitulo] = useState('');
  const [areaAcademica, setAreaAcademica] = useState('');
  const [dedicacion, setDedicacion] = useState('');
  const [aniosExperiencia, setAniosExperiencia] = useState(0);

  const [registros, setRegistros] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    cargarDocentes();
  }, []);

  const cargarDocentes = async () => {
    try {
      const response = await fetch('http://localhost:3001/docentes');
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      alert('Error al cargar los docentes');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setTitulo('');
    setAreaAcademica('');
    setDedicacion('');
    setAniosExperiencia(0);
  };

  const registrarDatos = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      correo,
      telefono,
      titulo,
      area_academica: areaAcademica,
      dedicacion,
      anios_experiencia: aniosExperiencia,
    };

    if (editIndex !== null) {
      try {
        const docente = registros[editIndex];

        const response = await fetch(
          `http://localhost:3001/docentes/${docente.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const nuevosRegistros = [...registros];

          nuevosRegistros[editIndex] = {
            ...docente,
            nombre,
            correo,
            telefono,
            titulo,
            area_academica: areaAcademica,
            dedicacion,
            anios_experiencia: aniosExperiencia,
          };

          setRegistros(nuevosRegistros);
          setEditIndex(null);

          alert('Docente actualizado correctamente');
        } else {
          const err = await response.json().catch(() => ({}));
          alert(err.error || 'Error al actualizar el docente');
        }
      } catch (error) {
        alert('Error de conexión al actualizar');
      }
    } else {
      try {
        const response = await fetch(
          'http://localhost:3001/docentes',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setRegistros([...registros, data]);
          alert('Docente guardado correctamente');
        } else {
          alert(data.error || 'Error al guardar el docente');
        }
      } catch (error) {
        alert('Error de conexión al guardar');
      }
    }

    limpiarFormulario();
  };

  const eliminarRegistro = async (idx) => {
    const docente = registros[idx];

    try {
      const response = await fetch(
        `http://localhost:3001/docentes/${docente.id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setRegistros(registros.filter((_, i) => i !== idx));

        if (editIndex === idx) {
          setEditIndex(null);
          limpiarFormulario();
        }

        alert('Docente eliminado correctamente');
      } else {
        alert('Error al eliminar el docente');
      }
    } catch (error) {
      alert('Error de conexión al eliminar el docente');
    }
  };

  const editarRegistro = (idx) => {
    const reg = registros[idx];

    setNombre(reg.nombre);
    setCorreo(reg.correo);
    setTelefono(reg.telefono);
    setTitulo(reg.titulo);
    setAreaAcademica(reg.area_academica);
    setDedicacion(reg.dedicacion);
    setAniosExperiencia(reg.anios_experiencia);

    setEditIndex(idx);
  };

  return (
    <div className="container">
      <div className="card-formulario">
        <h1>Administración de Docentes</h1>
        <p>Registro y actualización de información académica</p>

        <form onSubmit={registrarDatos}>
          <div className="grid-form">

            <div className="campo">
              <label>Nombre completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="campo">
              <label>Correo institucional</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="campo">
              <label>Teléfono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>Título académico</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>Área académica</label>
              <input
                type="text"
                value={areaAcademica}
                onChange={(e) => setAreaAcademica(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>Dedicación</label>
              <select
                value={dedicacion}
                onChange={(e) => setDedicacion(e.target.value)}
              >
                <option value="">Seleccione</option>
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Medio tiempo">Medio tiempo</option>
                <option value="Cátedra">Cátedra</option>
              </select>
            </div>

            <div className="campo">
              <label>Años de experiencia</label>
              <input
                type="number"
                value={aniosExperiencia}
                onChange={(e) => setAniosExperiencia(e.target.value)}
              />
            </div>

          </div>

          <button className="btn-guardar" type="submit">
            {editIndex !== null
              ? 'Actualizar Docente'
              : 'Registrar Docente'}
          </button>
        </form>
      </div>

      <div className="card-tabla">
        <h2>Listado de Docentes</h2>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Área</th>
              <th>Dedicación</th>
              <th>Experiencia</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {registros.map((docente, idx) => (
              <tr key={docente.id}>
                <td>{docente.nombre}</td>
                <td>{docente.correo}</td>
                <td>{docente.area_academica}</td>
                <td>{docente.dedicacion}</td>
                <td>{docente.anios_experiencia} años</td>

                <td>
                  <button
                    type="button"
                    className="btn-editar"
                    onClick={() => editarRegistro(idx)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn-eliminar"
                    onClick={() => eliminarRegistro(idx)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default App;