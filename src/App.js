import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import {Container, Spinner} from 'react-bootstrap'
import {useContext, useEffect, useState} from 'react'
import {Context} from './index'
import {observer} from 'mobx-react-lite'
import {check} from './api/userAPI'


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(() => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(()=> setLoading(false))
    }, )

    if (loading) {
        return <Container className='d-flex align-items-center justify-content-center'>
            <Spinner animation="border" variant="secondary" />
        </Container>
    }

    return (
        <Container>
            <NavBar/>
            <AppRouter/>
        </Container>
    )
})

export default App
