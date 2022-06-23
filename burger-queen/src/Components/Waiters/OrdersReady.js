/* eslint-disable indent */
import graybell from '../../Assets/icons/whiteBell.png'
import { useState } from 'react'

export const OrdersReady = ({ rol, command, table, products }) => {
  const [productDelivery, SetProductDelivery] = useState({
    orderId: command.orderId,
    table: command.table,
    clientName: command.clientName,
    totalProducts: command.totalProducts,
    totalPrice: command.totalPrice,
    TableStatus: command.TableStatus,
    waiter: command.waiter,
    waiterId: command.waiterId,
    date: command.date,
    startTime: command.startTime,
    totalTime: command.totalTime,
    productos: command.productos
  })
  const handleDeliveryProduct = (CurrentProduct, command) => {
    // entra a la orden luego a producto y busca el producto en el array , si el seleccionado coincide con el id
    const id = command.productos.findIndex((producto) => {
      return producto.id === CurrentProduct.id
    })
    console.log(id)
    const updatedMesa = [...command.productos]
    for (const property in updatedMesa[id]) {
      if (property === 'productStatus') {
        updatedMesa[id][property] = 'delivery'
      }
    }
    SetProductDelivery({ ...productDelivery, productos: [...updatedMesa] })
    fetchProductos({ ...productDelivery, productos: [...updatedMesa] })
  }
  const fetchProductos = async (productStats) => {
    await fetch(`http://localhost:4000/orders/${command.id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(productDelivery)
    }).then(response => response.json()).then(console.log('actualizado'))
  }
  const handleStats = async (product) => {
    handleDeliveryProduct(product, command)
  }
  return (
    <>
      <div className='tables_container'>
        {products &&
          products.map((product) => (
            (product.productStatus === 'ready')
              ? (<div className='tablesAside_table' key={product.id}>
                <div className='table_number'>{table}</div>
                <div className='product_table_name' >{product.name}</div>
                <div className='table_quantity' >{product.cantidad}</div>
                {rol === 'waiter'
                  ? (<img
                    src={graybell}
                    alt='bell'
                    className='icon_bell'
                    onClick={() => { handleStats(product) }}
                  />)
                  : (
                    <div className='product_time'>{product.productTime}</div>
                  )
                }

              </div>
              )
              : undefined
          ))
        }
      </div>
    </>
  )
}
// asi se puede entrar mesas[0].productos[0].status
