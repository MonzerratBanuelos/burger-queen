import { useState, useEffect } from 'react'
export const GetTimer = ({ mesa }) => {
  const hoursMinSecs = { hours: mesa.startTime.slice(0, 2), minutes: mesa.startTime.slice(3, 5), seconds: 0 }
  const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs
  const [[hour, minute, second], setTime] = useState([hours, minutes, seconds])
  const funcionCucha = () => {
    const fecha = new Date()
    const dateHora = fecha.getHours()
    const dateMinut = fecha.getMinutes()
    const totalHoras = Number(mesa.startTime.slice(0, 2)) - Number(dateHora)
    const totalMin = Number(mesa.startTime.slice(3, 5)) - Number(dateMinut)
    const veoveo = Math.abs(totalHoras) + ':' + Math.abs(totalMin)
    console.log(veoveo)
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
      <p className='timer'>{`${hour.toString()}:${minute.toString()}:${second.toString()}`}</p>
    </div>)
}
