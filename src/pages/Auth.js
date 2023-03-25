import React, {useContext, useState} from 'react'
import {Button, Container, Form, Nav} from 'react-bootstrap'
import {LOGIN_ROUTE, PANEL_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import {redirect, useLocation, useNavigate} from 'react-router-dom'
import {login, registration} from '../api/userAPI'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(name, email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            console.log(user.isAuth)
            navigate(PANEL_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }


    return (
        <Container className="d-flex justify-content-center align-items-center mt-4">
            <Form>
                {!isLogin && <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} required placeholder="Enter name"/>
                </Form.Group>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={e => setPassword(e.target.value)} required type="password"
                                  placeholder="Password"/>
                </Form.Group>
                <Container className="d-flex align-items-center justify-content-between p-0">
                    <Button onClick={click} variant="primary" >
                        {isLogin ? 'Login' : 'Sign up'}
                    </Button>
                    {isLogin && <Nav>
                        <Nav.Link href={REGISTRATION_ROUTE}>Registration</Nav.Link>
                    </Nav>}
                </Container>
            </Form>
        </Container>

    )
})


export default Auth