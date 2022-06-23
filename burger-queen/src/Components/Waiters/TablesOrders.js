import '../../styles/TablesOrders.css'
import Add from '../../Assets/icons/yelowAdd.png'
import { TableOrder } from './TableOrder'
export const TablesOrders = ({ setMain, setAside, getTimer, setOnOff, commands, setOrder, setEditingTable }) => {
  const handleOrder = () => {
    setMain('Menu')
    setAside('Command')
  }
  return (
    <div className='tables_container'>{
      commands && commands.map((command) => (
        <TableOrder key={command.id} command={command} setMain={setMain} setAside={setAside} getTimer={getTimer} setOnOff={setOnOff} setOrder={setOrder} setEditingTable={setEditingTable} />
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
