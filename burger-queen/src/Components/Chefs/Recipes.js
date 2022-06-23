import '../../styles/Recipes.css'
export const Recipes = ({ rol, newProduct, setAside }) => {
  return (
    <section className='section_recipes'>
      <img className='img_recipe' src={newProduct.urlImg}></img>
      <div className='image_background'></div>
      <div className='name_recipe'>{newProduct.name}</div>
      { rol === 'chef'
        ? (<>
          <div className='category_data'> <b>Receta:</b></div>
          <div className='data_recipe'>
            <p>{newProduct.recipe}</p>
          </div>
        </>)
        : <>
          <div className='category_data'> <b>Descripción</b></div>
          <div className='data_recipe'>
           <p>{newProduct.description}</p>
          </div>
        </>
     }
      <div className='category_data'> <b>Tiempo de preparación:</b>
        <p>{newProduct.melPrep}</p>
      </div>
      <div className='category_data'><b>Preparado unicamiente durante:</b>
        <p>{newProduct.category}</p>
      </div>
      <button className="btn_close" onClick={() => { setAside(null) }}>Cerrar</button>
    </section>
  )
}
