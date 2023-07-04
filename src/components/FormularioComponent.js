
const FormularioComponent = (props) => {
  const { handleButton, accion, opcion, placeholder, defaultValue, fromRef } = props.list;
  return (
    <main className='main'>
      <div className="contenido contenido-opciones fix-tamano">
        <h1>{accion} {opcion}</h1>
        <form id="form-editar" className="form-opciones" onSubmit={handleButton} ref={fromRef}> 
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