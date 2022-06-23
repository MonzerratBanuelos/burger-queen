import { ProductsDelivered } from '../Waiters/ProductsDelivered'
import '../../styles/ProductsControl.css'

export const Delivered = ({ commands }) => {
  return (
    <>
      <div className='tables_container'>
        {commands &&
          commands.map((command) => (
            <ProductsDelivered
              table={command.table}
              products={command.productos}
              key={command.id}
            />
          ))}
      </div>
    </>
  )
}
