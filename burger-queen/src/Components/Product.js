import '../styles/Product.css'
export const Product = ({ onOff, setNewProduct, rol, product, setOrder, order, setAside }) => {
  const setToRender = () => {
    setNewProduct(product)
    if (rol === 'admin') {
      setAside('FormProducts')
    }
    if (rol === 'mesero' && onOff === true) {
      handleAddProduct(product)
    }
    if (rol === 'mesero' && onOff === false) {
      setAside('Descripciones')
    }
    if (rol === 'cocinero') {
      setAside('VerReceta')
    }
  }
  const handleAddProduct = (currentProduct) => {
    // entra a la orden luego a producto y busca el producto en el array , si el seleccionado coincide con el id
    const id = order.productos.findIndex((producto) => {
      return producto.id === currentProduct.id
    })
    const addProduct = { id: currentProduct.id, name: currentProduct.name, price: currentProduct.price, productStatus: 'kitchen' }
    //  verifica que exista un producto seleccionado en el array de productos
    if (id >= 0) {
      // crea una copia del array de productos para poder modificar la cantidad
      const updatedOrder = [...order.productos]
      // hace una extraccion ed propiedades para validar si existe una cantidad en la copia del producto selecionado
      for (const property in updatedOrder[id]) {
        // busca la propiedad de cantidad de productos
        if (property === 'cantidad') {
          // destructura segun el id y la propiedad de cantidad y actualiza la misma con un producto mas
          updatedOrder[id][property] = updatedOrder[id][property] + 1
        }
      }
      // si no valida que el producto ya haya sido seleccionado con anterioridad, lo agrega, estopara evitar que solo se pueda seleccionar un producto
      setOrder({ ...order, productos: [...updatedOrder] })
    } else {
      // si es seleccionado por primera vez, lo agrega al array de los productos
      setOrder({ ...order, productos: [...order.productos, { ...addProduct, cantidad: 1 }] })
    }
  }
  return (
    <div
      className='card_product'
      key={product.id}
      onClick={() => {
        setToRender()
      }}
    >
      <img className='img_product' src={product.urlImg}></img>
      <div className='product_description'>
        <div className='data_product'>
          <h2 className='name_product'>{product.name}</h2>
          <p className='time_product'>{product.melPrep}</p>
        </div>
        <div className='price_product'>${product.price}</div>
      </div>
    </div>
  )
}
