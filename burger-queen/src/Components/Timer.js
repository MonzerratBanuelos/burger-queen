import { useState, useEffect } from 'react'
export const GetTimer = ({ mesa }) => {
  const hoursMinSecs = { hours: 1, minutes: 20, seconds: 55 }
  const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs
  const [[hour, minute, second], setTime] = useState([hours, minutes, seconds])

  const tick = () => {
    setTime([hour, minute, second + 1])
    if (second === 59) {
      setTime([hour, minute + 1, 0])
    } else if (minute === 59) {
      setTime([hour + 1, 0, 0])
    }
  }
  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000)
    return () => clearInterval(timerId)
  })

  return (
    <div>
      <p className='timer'>{`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`}</p>
    </div>)
}
