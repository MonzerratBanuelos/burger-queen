import { useState, useEffect } from 'react'
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { db } from '../../../Lib/firebase-keys'

export const Chefs = ({ setAside, setEditStaff }) => {
  const [staff, setStaff] = useState([])

  const handleEditStaff = (chef) => {
    setEditStaff(chef)
    setAside('CreateUsers')
  }
  const getChef = async () => {
    const q = query(collection(db, 'User'), where('rol', '==', 'chef'))
    onSnapshot(q, (querySnapShot) => {
      const chefs = []
      querySnapShot.forEach((chef) => {
        chefs.push({ ...chef.data(), id: chef.id })
      })
      setStaff(chefs)
    })
  }

  useEffect(() => {
    getChef()
  }, [])

  return (<div className='employees_container'>
    <h4 className='employees_table_title'>Cocineros</h4>
    {staff.map((chef) => {
      return (
        <section className='employee_card' key={chef.uid}>
          <p>{chef.name}</p>
          <button id={chef.uid} className='btn_employee' onClick={() => { handleEditStaff(chef) }}>+</button>
        </section>
      )
    })}
  </div>
  )
}
