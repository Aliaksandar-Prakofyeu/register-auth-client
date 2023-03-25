import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import {Container, Spinner} from 'react-bootstrap'
import {useContext, useEffect, useState} from 'react'
import {Context} from './index'
import {observer} from 'mobx-react-lite'
import data from 'bootstrap/js/src/dom/data'
import {check} from './api/userAPI'


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(()=> setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    return (
        <Container>
            <NavBar/>
            <AppRouter/>
        </Container>
    )
})

export default App
