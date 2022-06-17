import { useState, useEffect } from 'react'
export const GetTimer = ({ mesa, setTimer2 }) => {
  const hoursMinSecs = { hours: mesa.startTime.slice(0, 2), minutes: mesa.startTime.slice(3, 5), seconds: mesa.startTime.slice(6, 8) }
  const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs
  const [[hour, minute, second], setTime] = useState([hours, minutes, seconds])
  const [pruebaHora, setPruebaHora] = useState('0')
  const funcionCucha = () => {
    const fecha = new Date()
    const dateMinuts = fecha.getMinutes()
    const dateSeconds = fecha.getSeconds()
    const totalMin = Number(mesa.startTime.slice(3, 5)) - Number(dateMinuts)
    const totalSec = Number(mesa.startTime.slice(6, 8)) - Number(dateSeconds)
    const veoveo = Math.abs(totalMin).toString().padStart(2, '0') + ':' + Math.abs(totalSec).toString().padStart(2, '0')
    setPruebaHora(veoveo)
    setTimer2('quepedo')
  }
  // esto es una prueba

  const tick = () => {
    setTime([hour, minute, second + 1])
    if (second === 59) {
      setTime([hour, Number(minute) + 1, 0])
    } if (minute === 59) {
      setTime([Number(hour) + 1, 0, Number(second) + 1])
    }
    funcionCucha()
  }
  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000)
    return () => clearInterval(timerId)
  }, [second])

  return (
    <div>
{/*       <p className='timer'>{`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`}</p> */}
      <p className='timer'>{pruebaHora}</p>
    </div>)
}
