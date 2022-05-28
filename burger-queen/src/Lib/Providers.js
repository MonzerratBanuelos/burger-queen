import { signOut } from 'firebase/auth'
import { auth, db } from './firebase-keys'
import { deleteDoc, doc } from 'firebase/firestore'

// Con esta funcion cierra sesion el usuario
export const exit = () => signOut(auth)
// Con esta funcion se elimina al staff de firestore
export const deleteStaff = async(id) => {
  await deleteDoc(doc(db, 'User', id))
  return console.log('hi')
}
// con esta función puedes actualizar los datos del usuario
