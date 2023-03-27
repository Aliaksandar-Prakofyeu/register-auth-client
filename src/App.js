import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import {Container} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'


const App = observer(() => {
    return (
        <Container>
            <NavBar/>
            <AppRouter/>
        </Container>
    )
})

export default App
