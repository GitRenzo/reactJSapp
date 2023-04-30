import Pacientes from "./Pacientes"
const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {

  return (

    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {pacientes.length != 0 ?

        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Administra tus pacientes y <span className="text-indigo-600 font-bold">citas</span></p>

          {pacientes.map((paciente) => (
            <Pacientes
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
          ))}
        </>
        :
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Agrega a tus pacientes y <span className="text-indigo-600 font-bold">apareceran aqui</span></p>
        </>
      }

    </div>


  )
}
export default ListadoPacientes

