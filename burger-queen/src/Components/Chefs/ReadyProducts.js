import { StatusProduct } from '../Waiters/StatusProduct'
import '../../styles/ProductsControl.css'

export const ReadyProducts = ({ rol, commands, setCommands, GetTimer }) => {
  return (
    <section className='productsControl_container'>
      <section className='ProductReady_Container1'>
        <p className='productsControl_title'>
          <b>Productos Listos</b>
        </p>
        <div className='Products_table1'>
          <p className='productsControl_subtittle'> Mesa | Producto</p>
          <p className='productsControl_subtittle1'> Cantidad | Tiempo</p>
        </div>
        <div className='scroll1'>
          <StatusProduct rol={rol} commands={commands} setCommands={setCommands} GetTimer={GetTimer} />
        </div>
      </section>
    </section>
  )
}
