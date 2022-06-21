import '../../styles/TableOrder.css'
export const TableOrder = ({ GetTimer, mesa, setOrder, setAside, setMain, editingTable, setEditingTable, setOnOff }) => {
  return (
    <div className='container_table' key={mesa.id} onClick={() => { setMain('Menu'); setAside('Comanda'); setOrder(mesa); setOnOff(true); console.log(editingTable); setEditingTable('editando') }}>
      <table className='data_table'>
        <thead>
          <tr><th id='title_table'>Mesa{mesa.table} </th><th id='time_title'>{mesa.startTime}</th>
         <th><GetTimer mesa={mesa} /></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Cliente:</td><td>{mesa.clientName}</td></tr>
          <tr><td>Productos:</td><td>{mesa.totalProducts}</td></tr>
          <tr><td>Total:</td><td>{mesa.totalPrice}</td></tr>
        </tbody>
      </table>
    </div>
  )
}
