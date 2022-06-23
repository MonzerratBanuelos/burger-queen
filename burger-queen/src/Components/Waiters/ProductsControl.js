import { StatusProduct } from '../Waiters/StatusProduct'
import { Delivered } from '../Waiters/Delivered'
import '../../styles/ProductsControl.css'

export const ProductsControl = ({ rol, commands, setCommands, timer2 }) => {
  // console.log(timer2)
  return (
    <section className='productsControl_container'>
      <section className='ProductReady_Container'>
        <p className='productsControl_title'>
          <b>Pedidos Listos</b>
        </p>
        <div className=' Products_table'>
          <p className='productsControl_subtittle'> Mesa | Producto</p>
          <p className='productsControl_subtittle1'> Cantidad | Entregar</p>
        </div>
        <div className='scroll'>
          <StatusProduct rol={rol} commands={commands} setCommands={setCommands} />
        </div>
      </section>
      <section className='ProductReady_Container'>
        <p className='productsControl_title'>
          <b>Pedidos Entregados</b>
        </p>
        <div className=' Products_table'>
          <p className='productsControl_subtittle'> Mesa | Producto</p>
          <p className='productsControl_subtittle1'> Entregado</p>
        </div>
        <div className='scroll'>
          <Delivered commands={commands} setCommands={setCommands} />
        </div>
      </section>
    </section>
  )
}
