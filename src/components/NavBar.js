import React, {useContext} from 'react'
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import {LOGIN_ROUTE} from '../utils/consts'
import {Context} from '../index'
import {observer} from 'mobx-react-lite'
import {Table} from 'react-bootstrap-icons'


const NavBar = observer(() => {
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand className='mr-3' href="/login"><Table/></Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {user.isAuth ? <Button onClick={logOut} className="me-2" variant={'secondary'}>Logout</Button> :
                            <Button href={LOGIN_ROUTE} className="me-2" variant={'secondary'}>Login</Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

export default NavBar