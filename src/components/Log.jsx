import { useContext, useState } from "react"
import { DataContext } from "./Context"

export default function Login() {

    const context = useContext(DataContext)
    const [error, setError] = useState('')
    const [user, setUser] = useState({name:'', pswd:''})
    const [color, setColor] = useState()
    const [type, setType] = useState(false)

    function LogUser(event) {
        event.preventDefault();
        for (let acc of context.accounts) {
            if (acc.name === user.name && acc.password === user.pswd) {
                context.setUser(acc)
                localStorage.setItem("user", JSON.stringify(acc))
            }
        }
        setError('Неверный логин или пароль')
        setColor('red')
    }

  return (
    <form onSubmit={(event) => LogUser(event)}>
        <input style={{ borderColor: color }} type="text" placeholder='Логин' value={user.name} onChange={(event) => setUser({name:event.target.value, pswd:user.pswd})} required/>
        <input style={{ borderColor: color }} type={type ? 'text' : 'password'} placeholder='Пароль' value={user.pswd} onChange={(event) => setUser({name:user.name, pswd:event.target.value})} required/>
        <button type='submit'>Войти</button>
        <a className="pass" href='#' onClick={()=> setType(!type)}>{type ? 'Скрыть пароль' : 'Показать пароль'}</a>
        <p style={{ color: 'red' }}>{error}</p>
    </form>
  )
}
