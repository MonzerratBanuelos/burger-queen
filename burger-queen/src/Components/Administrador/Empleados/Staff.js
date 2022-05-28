// import { useState } from 'react'
import '../../../styles/Staff.css'
import { Meseros } from './Meseros'
import { Cocineros } from './Cocineros'
import { Administradores } from './Administradores'
import { deleteStaff } from '../../../Lib/Providers'
export const Staff = ({ getUser }) => {
  // const [staff, setStaff] = useState([])
  // useEffect(() => {
  // }, [])
  return (
    <section className='contenedor_tablas'>
      <Meseros deleteStaff={deleteStaff} getUser={getUser}/>
      <Cocineros deleteStaff={deleteStaff}/>
      <Administradores deleteStaff={deleteStaff}/>
    </section>
  )
}
