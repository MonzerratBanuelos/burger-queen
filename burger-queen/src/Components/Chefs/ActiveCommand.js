import { useState } from 'react'
import '../../styles/ActiveCommand.css'
import bell from '../../Assets/icons/yelowBell.png'
export const ActiveCommand = ({ command, getTimer, setTimer2, timer2 }) => {
  const cronometro = getTimer(command)
  const [productNewStatus, SetProductNewStatus] = useState({
    orderId: command.orderId,
    table: command.table,
    clientName: command.clientName,
    totalProducts: command.totalProducts,
    totalPrice: command.totalPrice,
    TableStatus: command.TableStatus,
    waiter: command.displayName,
    waiterId: command.waiterId,
    date: command.date,
    startTime: command.startTime,
    totalTime: command.totalTime,
    productos: command.productos
  })
  const updateStatus = (currentProducto, command) => {
    const id = command.productos.findIndex((producto) => {
      return producto.id === currentProducto.id
    })
    const updatedMesa = [...command.productos]
    console.log(updatedMesa)
    for (const property in updatedMesa[id]) {
      if (property === 'productStatus') {
        updatedMesa[id][property] = 'ready'
      }
      if (property === 'productTime') {
        updatedMesa[id][property] = cronometro
      }
    }
    const isReady = []
    for (let i = 0; i < updatedMesa.length; i++) {
      isReady.push(updatedMesa[i].productStatus)
    }
    const testStatus = (elemento) =>
      elemento === 'ready' || elemento === 'delivery'
    const nowIsReady = isReady.every(testStatus)
    console.log(nowIsReady)
    if (nowIsReady === true) {
      productNewStatus.TableStatus = 'ready'
      productNewStatus.totalTime = cronometro
      SetProductNewStatus({ ...productNewStatus, productos: [...updatedMesa], TableStatus: 'ready', totalTime: cronometro })
    } else {
      SetProductNewStatus({ ...productNewStatus, productos: [...updatedMesa] })
    }
    fetchProductos({ ...productNewStatus, productos: [...updatedMesa], TableStatus: 'ready', totalTime: cronometro })
  }

  const fetchProductos = async (productStats) => {
    await fetch(`http://localhost:4000/orders/${command.id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(productNewStatus)
    })
      .then((response) => response.json())
      .then(console.log('actualizado'))
    console.log(command)
  }

  const handleSubmit = async (product) => {
    updateStatus(product, command)
  }
  return (
    <div className='table_container' key={command.id}>
      <div className='header_order'>
        <div className='num_table'>Mesa {command.table}</div>
        <div className='timer_Content'>{cronometro}</div>
        <div className='delivery'>Entregar</div>
      </div>
      {command && command.productos.map((product) =>
        product.productStatus === 'kitchen'
          ? <div className='products_order' key={product.name}>
              <div className='cant_product'>{product.cantidad}</div>
              <div className='name_product'>{product.name}</div>
              <div className='bell'>
                <img src={bell} alt='bell' className='btn_bell' onClick={() => {
                  handleSubmit(product)
                }} />
              </div>
          </div>
          : undefined
      )}
    </div>
  )
}
