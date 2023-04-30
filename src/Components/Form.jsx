import { useState, useEffect } from "react"
import Error from "./Error";

const Form = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [name, setName] = useState('');
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  // Lo que hace esto es que, react solamente renderiza con paciente ha cambiado
  // useEffect(() => { 
  //   console.log(paciente);
  // }, [paciente])

  // Este useEffect muestra solamente cuando el objeto de pacientes no esta vacio
  // esto nos permite que no se renderice innecesariamente
  useEffect(() => {
    // Object.keys nos ayuda adeterminar si el objecto esta vacio
    if (Object.keys(paciente).length > 0) {
      setName(paciente.name)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = (() => {
    const random = Math.random().toString(36).substr(2)
    const date = Date.now().toString(36)
    return random + date
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    //  validacion de formulario 
    if ([name, propietario, email, fecha, sintomas].includes(' ')) {
      setError(true)
      return;
    }

    const objetoPacientes = {
      name,
      propietario,
      email,
      fecha,
      sintomas,
    }

    // Esto verifica si el ID que queremos editar ya existe en el objeto
    if (paciente.id) {
      // Editando registro
      objetoPacientes.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPacientes : pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})
    }
    else {
      // Nuevo registro
      objetoPacientes.id = generarId()
      setPacientes([...pacientes, objetoPacientes])
    }

    setError(false)

    setName('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y <span className="text-indigo-600 font-bold">Administralos</span></p>

      <form action="" className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>

        {error &&
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>
        }

        <div className="mb-5">
          <label htmlFor="Mascota" className="block text-gray-700 font-bold uppercase">Nombre mascota</label>
          <input id="Mascota" type="text" placeholder="Nombre de la mascota" className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="Propietario" className="block text-gray-700 font-bold uppercase">Nombre propietario</label>
          <input id="Propietario" type="text" placeholder="Nombre del propietario" className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="Email" className="block text-gray-700 font-bold uppercase">Email</label>
          <input id="Email" type="email" placeholder="Email contacto propietario" className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="Alta" className="block text-gray-700 font-bold uppercase">Alta</label>
          <input id="Alta" type="date" className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

        </div>

        <div className="mb-5">
          <label htmlFor="Sintomas" className="block text-gray-700 font-bold uppercase">Sintomas</label>
          <textarea id="Sintomas" placeholder="Describe los sintomas" className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transi"
          value={paciente.id ? "Editar paciente" : "Agregar nuevo paciente"} />
      </form>
    </div>
  )
}

export default Form