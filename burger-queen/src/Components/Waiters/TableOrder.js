import '../../styles/TableOrder.css'
export const TableOrder = ({ setMain, setAside, getTimer, setOnOff, command, setOrder, setEditingTable }) => {
  const cronometro = getTimer(command)
  return (
    <div className='container_table' key={command.id} onClick={() => { setMain('Menu'); setAside('Command'); setOrder(command); setOnOff(true); setEditingTable('editando') }}>
      <div className='order_header'>
        <div className='order_table'>Mesa</div>
        <div className='order_table'>{command.table}</div>
        <div className='time_title'>{cronometro}</div>
      </div>
      <div className='order_info'>
        <div className='order_data'>Cliente</div>
        <div className='order_command'>{command.clientName}</div>
      </div>
      <div className='order_info'>
        <div className='order_data'>Productos</div>
        <div className='order_command'>{command.totalProducts}</div>
      </div>
      <div className='order_info'>
        <div className='order_data'>Total</div>
        <div className='order_command'>{command.totalPrice}</div>
      </div>
    </div>
  )
}
