import { OrdersReady } from '../Waiters/OrdersReady'
import '../../styles/ProductsControl.css'

export const StatusProduct = ({ rol, mesas, setMesas, timer2 }) => {
  return (
    <>
      <div className='tabless_container'>
        {mesas &&
          mesas.map((mesa) => (
            <OrdersReady
              rol={rol}
              mesa= {mesa}
              setMesas= {setMesas}
              table={mesa.table}
              products={mesa.productos}
              key={mesa.id}
              timer2={timer2}
            />
          ))}
      </div>
    </>
  )
}
// asi se puede entrar mesas[0].productos[0].status
