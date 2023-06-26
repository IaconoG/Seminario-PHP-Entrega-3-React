
const FormularioComponent = (props) => {
  const { handleChange, accion, opcion, placeholder, defaultValue } = props.list;
  return (
    <main className='main'>
      <div className="contenido contenido-opciones fix-tamano">
        <h1>{accion} {opcion}</h1>
        <form id="form-editar" className="form-opciones" onSubmit={handleChange}> 
          <div className="form-contenido">
            <label htmlFor="nombre">Nombre</label>
            <input className="input-opciones" id="nombre" name="nombre" defaultValue={defaultValue} placeholder={placeholder}/>
            <button className="fix-btn" >{accion}</button>
          </div>
        </form>
      </div>
    </main>
  )
}


export default FormularioComponent;