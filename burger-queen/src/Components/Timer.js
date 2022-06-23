import { useState, useEffect } from 'react'
export const getTimer = (mesa) => {
  //  const hoursMinSecs = { hours: mesa.startTime.slice(0, 2), minutes: mesa.startTime.slice(3, 5), seconds: mesa.startTime.slice(6, 8) }
  // const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs
  // const [[hour, minute, second], setTime] = useState([hours, minutes, seconds])
  const [pruebaHora, setPruebaHora] = useState('0')
  const funcionCucha = () => {
    // se crea una nueva fecha fijandola con la fecha de creación de la orde
    const dateTable = new Date(mesa.date)
    // se crea la nueva fecha actual que se esta actualizando cada seg gracias al useEffect de abajo
    const dateNow = new Date()
    // de ambas fechas se saca su tiempo con el getTime y se restan para conocer la dif en milisegundos
    const diffe = dateNow.getTime() - dateTable.getTime()
    // guardamos la diferencia en una variable que los representa "milisegundos"
    let mseco = diffe
    // se crea la const de hora y se hacen calculos para obtenerla
    // representa 1000= 1 seg / 60 = 60 seg en 1 minuto / 60 = 60 min en una hora
    const ho = Math.floor(mseco / 1000 / 60 / 60)
    // se resta el total obtenido a los milisegundos generales
    mseco -= ho * 1000 * 60 * 60
    // se crea la const de Minutos y se hacen calculos para obtenerla
    // representa 1000= 1 seg / 60 = 60 seg en 1 minuto
    const mi = Math.floor(mseco / 1000 / 60)
    // se resta nuevamente el total obtenido a los milisegundos generales
    mseco -= mi * 1000 * 60
    // se crea la const de segundos y se hacen calculos para obtenerla
    // representa 1000= 1 seg en un minuto
    const se = Math.floor(mseco / 1000)
    mseco -= se * 1000
    // seteamos el estado con el que se condiciona el useEffect() con lo obtenido
    setPruebaHora(`${ho}:${mi}:${se}`)
    /*  const fecha = new Date()
     const dateHours = fecha.getHours()
     const dateMinuts = fecha.getMinutes()
     const dateSeconds = fecha.getSeconds()

     const totalHour = Number(dateHours) * 60

     const totalMin = (Number(dateMinuts) + Number(totalHour)) - ((Number(mesa.startTime.slice(0, 2)) * 60) + Number(mesa.startTime.slice(3, 5)))
     const totalSec = Number(dateSeconds) - Number(mesa.startTime.slice(6, 8))
     let miau = 0
     if (totalMin > 59) {
       const minutingos = totalMin - 60
       const horingas = totalHour / 60
       const hiihi = horingas.toString().slice(0, 1)
       miau = Math.abs(hiihi).toString().padStart(2, '0') + ':' + Math.abs(minutingos).toString().padStart(2, '0') + ':' + Math.abs(totalSec).toString().padStart(2, '0')
       console.log(minutingos)
       console.log(horingas + 'Horas')
       setPruebaHora(miau)
     } else {
       miau = Math.abs(totalMin).toString().padStart(2, '0') + ':' + Math.abs(totalSec).toString().padStart(2, '0')
       setPruebaHora(miau)
     } */
  }
  /*  const tick = () => {
     setTime([hour, minute, second + 1])
     if (second === 59) {
       setTime([hour, Number(minute) + 1, 0])
     } if (minute === 59) {
       setTime([Number(hour) + 1, 0, Number(second) + 1])
     }
     funcionCucha(mesa)
   } */

  useEffect(() => {
    const timerId = setInterval(() => funcionCucha(), 1000)
    return () => clearInterval(timerId)
  }, [pruebaHora])

  return pruebaHora
}
