import '../../styles/TablesOrders.css'
import Add from '../../Assets/icons/yelowAdd.png'
import { TableOrder } from './TableOrder'
export const TablesOrders = ({ GetTimer, onOff, setOnOff, setMain, setAside, mesas, setMesas, editingTable, setEditingTable, setOrder }) => {
  const handleOrder = () => {
    setMain('Menu')
    setAside('Comanda')
  }
  return (
    <div className='tables_container'>{
      mesas && mesas.map((mesa) => (
        <TableOrder GetTimer={GetTimer} mesa={mesa} key={mesa.id} setAside={setAside} editingTable={editingTable} setEditingTable={setEditingTable} setMain={setMain} setOrder={setOrder} setOnOff={setOnOff} />
      ))}
      <img
        src={Add}
        alt='Add'
        className='icon_Add'
        onClick={() => {
          handleOrder()
          setOnOff(true)
          setEditingTable(null)
        }}
      />
    </div>
  )
}
