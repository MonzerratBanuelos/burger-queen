import { OrdersReady } from '../Waiters/OrdersReady'
import '../../styles/ProductsControl.css'

export const StatusProduct = ({ rol, commands, setCommands }) => {
  return (
    <>
      <div className='tabless_container'>
        {commands &&
          commands.map((command) => (
            <OrdersReady
              rol={rol}
              command={command}
              setCommands={setCommands}
              table={command.table}
              products={command.productos}
              key={command.id}
            />
          ))}
      </div>
    </>
  )
}
// asi se puede entrar mesas[0].productos[0].status
