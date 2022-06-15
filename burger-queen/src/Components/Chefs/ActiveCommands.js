import { ActiveCommand } from './ActiveCommand'

export const ActiveCommands = ({ mesas, GetTimer, setTimer }) => {
  return (
    <div className='tables_container'>
      {mesas && mesas.map((mesa) => (
        (mesa.TableStatus === 'kitchen')
          ? (<ActiveCommand mesa={mesa} GetTimer={GetTimer} key={mesa.id}/>)
          : null
      ))}
    </div>
  )
}
