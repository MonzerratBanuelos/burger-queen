import { useState } from 'react'
export const ActiveCommand = ({ mesa, GetTimer }) => {
  const [productNewStatus, SetProductNewStatus] = useState({
    orderId: mesa.orderId,
    table: mesa.table,
    clientName: mesa.clientName,
    totalProducts: mesa.totalProducts,
    totalPrice: mesa.totalPrice,
    TableStatus: mesa.TableStatus,
    waiter: mesa.waiter,
    waiterId: mesa.waiterId,
    date: mesa.date,
    startTime: mesa.startTime,
    totalTime: mesa.totalTime,
    productos: []
  })
  const updateStatus = (currentProducto, mesa) => {
    const id = mesa.productos.findIndex((producto) => {
      return producto.id === currentProducto.id
    })
    const updatedMesa = [...mesa.productos]
    for (const property in updatedMesa[id]) {
      if (property === 'productStatus') {
        updatedMesa[id][property] = 'ready'
      }
      SetProductNewStatus({ ...productNewStatus, productos: [...updatedMesa] })
    }
    const isReady = []
    for (let i = 0; i < updatedMesa.length; i++) {
      isReady.push(updatedMesa[i].productStatus)
    }
    const testStatus = (elemento) => elemento === 'ready' || elemento === 'delivery'
    const nowIsReady = isReady.every(testStatus)
    if (nowIsReady === true) {
      productNewStatus.TableStatus = 'ready'
      SetProductNewStatus({ ...productNewStatus, TableStatus: 'ready' })
    }
    fetchProductos({ ...productNewStatus, productos: [...updatedMesa], TableStatus: 'ready' })
  }

  const fetchProductos = async (productStats) => {
    await fetch(`http://localhost:4000/orders/${mesa.id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(productNewStatus)
    }).then(response => response.json()).then(console.log('actualizado'))
    console.log(mesa)
  }

  const handleSubmit = async (product) => {
    updateStatus(product, mesa)
  }
  return (
    <div className='container_table' key={mesa.id}>
      <table className='data_table'>
        <thead>
          <tr>
            <th id='title_table'>
              Mesa
              <br />
              {mesa.table}{' '}
            </th>
            <GetTimer/>
          </tr>
        </thead>
        {mesa && mesa.productos.map((product) =>
          product.productStatus === 'kitchen'
            ? <tbody key={product.name}>
                <tr>
                  <td>{product.cantidad}</td>
                  <td>
                    {product.name}
                    <button
                      onClick={() => {
                        handleSubmit(product)
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              </tbody>
            : undefined
        )}
      </table>
    </div>
  )
}
