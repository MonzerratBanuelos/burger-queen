import '../../styles/Recipes.css'
export const Recipes = ({ singleProduct }) => {
  return (
    <section className='section_recipes'>
      <img className='img_recipe' src={singleProduct.urlImg}></img>
      <h2 className='name_recipe'>{singleProduct.name}</h2>
      <p className='recipe_recipe'>{singleProduct.recipe}</p>
      <p className='melPrep_recipe'>Tiempo de preparación: {singleProduct.melPrep}</p>
      <p className='category_recipe'>Preparado unicamiente durante: {singleProduct.category}</p>
    </section>
  )
}
