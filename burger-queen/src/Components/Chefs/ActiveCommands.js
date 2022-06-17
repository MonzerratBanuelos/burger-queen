import { ActiveCommand } from './ActiveCommand'

export const ActiveCommands = ({ mesas, GetTimer, setTimer2 }) => {
  return (
    <div className='tables_container'>
      {mesas && mesas.map((mesa) => (
        (mesa.TableStatus === 'kitchen')
          ? (<ActiveCommand mesa={mesa} GetTimer={GetTimer} setTimer2={setTimer2} key={mesa.id } />)
          : null
      ))}
    </div>
  )
}
