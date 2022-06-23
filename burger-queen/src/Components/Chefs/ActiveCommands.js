import { ActiveCommand } from './ActiveCommand'

export const ActiveCommands = ({ commands, getTimer, setTimer2, timer2 }) => {
  return (
    <div className='tables_container'>
      {commands && commands.map((command) => (
        (command.TableStatus === 'kitchen')
          ? (<ActiveCommand command={command} getTimer={getTimer} setTimer2={setTimer2} key={command.id} timer2={timer2} />)
          : null
      ))}
    </div>
  )
}
