import '../styles/HomePage.css'
import LogoBQB from '../Assets/Images/BQBlack.png'
import LogOut from '../Assets/icons/logOut.png'
import { ListProducts } from '../Components/Menu/ListProducts'
import CreateUsers from '../Components/Administrador/Empleados/CreateUsers'
import { Staff } from '../Components/Administrador/Empleados/Staff'
import EditarStaff from '../Components/Administrador/Empleados/EditarStaff'
import { db } from '../Lib/firebase-keys'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
// eslint-disable-next-line react/prop-types
export default function HomePage({ handleExit, currentUser, rol }) {
  console.log(rol)
  const getDates = new Date()
  const DateHour = getDates.getHours() + ':' + getDates.getMinutes()
  const initialUser = {
    email: '',
    password: '',
    rol: '',
    name: '',
    turn: ''
  }
  const [info, setInfo] = useState(initialUser)

  const getUser = async(id) => {
    const docRef = doc(db, 'User', id)
    const inputInfo = await getDoc(docRef)
    setInfo(inputInfo.data())
    console.log(info)
  }

  useEffect((id) => {
    getUser(id)
  }, [])

  return (
    <div className='home_container'>
      <header className='header_home'>
        <img src={LogoBQB} alt='Logo' className='logo_header' />
        <p className='inactiveB'>Mesas</p>
        <p className='activeB'>Menú</p>
        <img
          src={LogOut}
          alt='Logo'
          className='icon_header'
          onClick={() => {
            handleExit().then(() => console.log('cerraste sesion'))
          }}
        />
      </header>
      <div className='rol_info'>
        <p> <b>Usuario</b> {currentUser.displayName || 'Usuario'} </p>
        <p> <b>Hora:</b> {DateHour} </p>
      </div>

      <main className='main_home'>

        {rol === 'admin'
          ? <Staff getUser={getUser}/>
          : <ListProducts />
        }
      </main>
      <aside className="rol_aside">
        {rol === 'admin'
          ? <div>
          <CreateUsers />
          <EditarStaff info={info} />
          </div>
          : <div>hola</div>
        }

      </aside>
    </div>
  )
}
