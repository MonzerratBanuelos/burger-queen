/* eslint-disable brace-style */
import '../styles/HomePage.css'
import LogoBQB from '../Assets/Images/BQBlack.png'
import LogOut from '../Assets/icons/logOut.png'
import loadingIcon from '../Assets/icons/load-icon-png-22.png'
import { Menu } from '../Components/Menu'
import CreateUsers from '../Components/Administrador/Employees/CreateUsers'
import { TablesOrders } from '../Components/Waiters/TablesOrders'
import { Command } from '../Components/Waiters/Command'
import { ActiveCommands } from '../Components/Chefs/ActiveCommands'
import { Staff } from '../Components/Administrador/Employees/Staff'
import { useState, useEffect } from 'react'
import { ProductsControl } from '../Components/Waiters/ProductsControl'
import { ReadyProducts } from '../Components/Chefs/ReadyProducts'
import { Recipes } from '../Components/Chefs/Recipes'
import FormProducts from '../Components/Administrador/Products/FormProducts'
import { deleteStaff } from '../Lib/Providers'

import { getTimer } from '../Components/Timer'

// eslint-disable-next-line react/prop-types
export default function HomePage({ handleExit, currentUser, rol }) {
  // console.log(rol)
  const getDates = new Date()
  const DateHour = getDates.getHours().toString().padStart(2, '0') + ':' + getDates.getMinutes().toString().padStart(2, '0') + ':' + getDates.getSeconds()
  // setea el renderizado condicional del main
  const [handleMain, setHandleMain] = useState('')
  // setea el renderizado condicional del aside
  const [handleAside, setHandleAside] = useState('')
  // Guarda todas las ordenes obtenidas del fetch
  const [commands, setCommands] = useState([])
  // Guarda todas las comandas obtenidas del fetch
  const [totalOrders, setTotalOrders] = useState([])
  // Se utiliza para guardar la información del staff a editar
  const [editStaff, setEditStaff] = useState(null)
  // se guarda la informacion a renserizar en los forms
  const [newProduct, setNewProduct] = useState(null)
  // Se utiliza para condicionar el estado en el rol de waiter y mostrar recetas o agregar productos segun corresponda
  const [onOff, setOnOff] = useState(false)
  // Se llena con la informacion de la mesa a la que se elija para eventualmente editarla
  const [editingTable, setEditingTable] = useState(null)
  // Se llena con la informacion de la mesa a la que clickes para eventualmente editarla
  const [timer, setTimer] = useState(DateHour)
  const [timer2, setTimer2] = useState([])
  const [loading, setLoading] = useState(false)
  // Esta variable se para vaciar los forms
  const emptyForms = {
    orderId: 1,
    table: '',
    clientName: '',
    totalProducts: '',
    totalPrice: '',
    TableStatus: 'kitchen',
    waiter: currentUser.displayName,
    waiterId: currentUser.uid,
    date: getDates,
    startTime: DateHour,
    totalTime: '',
    productos: []
  }
  // Este estado se ulitiza como machote para llenar los datos y mandarlos a la db
  const [order, setOrder] = useState({
    orderId: 1,
    table: '',
    clientName: '',
    totalProducts: '',
    totalPrice: '',
    TableStatus: 'kitchen',
    waiter: currentUser.displayName,
    waiterId: currentUser.uid,
    date: getDates,
    startTime: DateHour,
    totalTime: '',
    productos: []
  })
  // da valor al handle de renderizado segun el rol
  const setFristRender = () => {
    setLoading(true)
    if (rol === 'admin') {
      setHandleMain('staff')
      setHandleAside('null')
    }
    if (rol === 'waiter') {
      setHandleMain('tables')
      setHandleAside('ProductsControl')
    }
    if (rol === 'chef') {
      setHandleMain('Command')
      setHandleAside('readyProducts')
    }
    setLoading(false)
  }
  // consulta a la db
  const getOrders = async () => {
    const url = 'http://localhost:4000/orders'
    const getFetchData = await fetch(url).then((resul) => resul.json())
    setTotalOrders(getFetchData)
    if (rol === 'waiter') {
      const filteredTable = getFetchData.filter(
        (order) => order.waiterId === currentUser.uid
      )
      setCommands(filteredTable)
    } else {
      setCommands(getFetchData)
    }
  }
  // observa el cambio para el primier renderizado y forzarlos
  useEffect(() => {
    setLoading(true)
    setFristRender()
    setLoading(false)
  }, [loading])
  // observa el cambio en la funcion getOrders
  useEffect(() => {
    getOrders()
  }, [order])
  // observa el cambio en la hora
  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      setTimer(date.toLocaleTimeString())
    }, 1000)
  }, [])

  // hace renderizado condicional en main
  const handleMainRender = (handleMain) => {
    // Admin
    if (handleMain === 'staff') {
      return (<Staff setEditStaff={setEditStaff} setAside={setHandleAside} setNewProduct={setNewProduct} />) }
    // mesero
    if (handleMain === 'tables') {
      return (<TablesOrders setMain={setHandleMain} setAside={setHandleAside} getTimer={getTimer} setOnOff={setOnOff} commands={commands} setOrder={setOrder} setEditingTable={setEditingTable} />) }
    if (handleMain === 'Menu') {
      return (<Menu onOff={onOff} rol={rol} setMain={setHandleMain} setAside={setHandleAside} order={order} setOrder={setOrder} newProduct={newProduct} setNewProduct={setNewProduct} commands={commands} setCommands={setCommands} loading={loading} />) }
    // chef
    if (handleMain === 'Command') {
      return (<ActiveCommands commands={commands} getTimer={getTimer} setTimer2={setTimer2} timer2={timer2} />) }
    if (handleMain === 'recipes') {
      return (<Menu rol={rol} setNewProduct={setNewProduct} order={order} setOrder={setOrder} setMain={setHandleMain} setAside={setHandleAside} handleMain={handleMain} />) }
  }
  // hace renderizado condicional en Aside
  const handleAsideRender = (handleMain) => {
    // Admin
    if (handleMain === 'CreateUsers') {
      return (<CreateUsers editStaff={editStaff} setEditStaff={setEditStaff} deleteStaff={deleteStaff} setAside={setHandleAside}/>) }
    if (handleMain === 'FormProducts') {
      return (<FormProducts newProduct={newProduct} setNewProduct={setNewProduct} setMain={setHandleMain} setAside={setHandleAside} setLoading={setLoading} />) }
    // mesero
    if (handleMain === 'ProductsControl') {
      return (<ProductsControl rol={rol} commands={commands} setCommands={setCommands} timer2={timer2} setTimer2={setTimer2} />) }
    if (handleMain === 'Command') {
      return (<Command editingTable={editingTable} setEditingTable={setEditingTable} totalOrders={totalOrders} order={order} setOrder={setOrder} setMain={setHandleMain} setAside={setHandleAside} DateHour={DateHour} currentUser={currentUser} getDates={getDates} />) }
    // chef
    if (handleMain === 'readyProducts') {
      return (<ReadyProducts rol={rol} commands={commands} setCommands={setCommands} GetTimer={getTimer} />) }
    if (handleMain === 'recipes') {
      return (<Recipes rol={rol} newProduct={newProduct} setAside={setHandleAside} />) }
  }
  return loading === true
    ? (<img src={loadingIcon} alt='loading' className='logo_header' />)
    : (<div className='home_container'>
          <header className='header_home'>
          <img src={LogoBQB} alt='Logo' className='logo_header' />
        {rol === 'admin' && (<p className={`${handleMain === 'staff' ? 'activeB' : 'inactiveB'}`}
            onClick={() => {
              setHandleMain('staff')
              setHandleAside('null')
              setNewProduct(null)
            }}>Empleados</p>
        )}
        {rol === 'admin' && (<p className={`${handleMain === 'Menu' ? 'activeB' : 'inactiveB'}`}
            onClick={() => {
              setHandleMain('Menu')
              setHandleAside('null')
              setNewProduct(null)
            }}>Productos</p>
        )}
        {rol === 'waiter' && (<p className={`${handleMain === 'tables' ? 'activeB' : 'inactiveB'}`}
            onClick={() => {
              setHandleMain('tables')
              setHandleAside('ProductsControl')
              setOrder(emptyForms)
            }}>Mesas</p>
        )}
        {rol === 'waiter' && (<p className={`${handleMain === 'Menu' ? 'activeB' : 'inactiveB'}`}
            onClick={() => {
              setHandleMain('Menu')
              setOnOff(false)
              setHandleAside('command')
              setOrder(emptyForms)
            }}>Menu</p>
        )}
        {rol === 'chef' && (<p className={`${handleMain === 'Command' ? 'activeB' : 'inactiveB'}`}
            onClick={() => {
              setHandleMain('Command')
              setHandleAside('readyProducts')
            }}>Comandas</p>
        )}
        {rol === 'chef' && (<p className={`${handleMain === 'recipes' ? 'activeB' : 'inactiveB'}`}
            onClick={() => {
              setHandleMain('recipes')
              setHandleAside('null')
            }}>Recetas</p>
        )}
        <img src={LogOut} alt='Logo'className='icon_header'
          onClick={() => {
            handleExit().then(() => console.log('cerraste sesion'))
          }}/>
      </header>

      <div className='rol_info'>
        <p><b>{currentUser.displayName}</b></p>
        <p><b>{rol}</b></p>
        <p><b>Hora:</b> {timer}</p>
      </div>

      <main className='main_home'>
        {rol === 'admin' && handleMainRender(handleMain)}
        {rol === 'waiter' && handleMainRender(handleMain)}
        {rol === 'chef' && handleMainRender(handleMain)}
      </main>

      <aside className='rol_aside'>
        {rol === 'admin' && handleAsideRender(handleAside)}
        {rol === 'waiter' && handleAsideRender(handleAside)}
        {rol === 'chef' && handleAsideRender(handleAside)}
      </aside>
    </div>
      )
}
