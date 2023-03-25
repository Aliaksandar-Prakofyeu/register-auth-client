import React, {useContext, useEffect, useState} from 'react'
import {Button, ButtonGroup, Container, Form, Table} from 'react-bootstrap'
import {Context} from '../index'
import {deleteUser, getUsers, updateStatus} from '../api/panelAPI'
import {observer} from 'mobx-react-lite'
import {useHandle} from '../utils/useHandle'
import jwtDecode from 'jwt-decode'

const Panel = observer(() => {
    const {users, user} = useContext(Context)
    const [checkAll, setCheckAll] = useState(false)
    const authUserId = jwtDecode(localStorage.getItem('token'))
    const [handleData, error] = useHandle(async () => {
        const res = await getUsers()
        const addCheckToUsers = res.map(u => ({...u, checked: false}))
        users.setUsers(addCheckToUsers)
    })

    useEffect(() => {
        handleData()
    }, [user.isAuth])

    const handleCheck = (value) => {
        const updatedUsers = users.users.map(u => u.id === value ?
            {...u, checked: u.checked !== undefined ? !u.checked : false} : u)
        users.setUsers(updatedUsers)
    }

    const handleCheckAll = () => {
        checkAll ? setCheckAll(false) : setCheckAll(true)
        const updatedUsers = users.users.map(u => u.id && {...u, checked: !u.checked})
        users.setUsers(updatedUsers)
    }


    const changeStatus = async (status) => {
        const checkedUsers = users.users.filter(u => u.checked)
        const blockedIds = []
        for (const u of checkedUsers) {
            try {
                await updateStatus(u.id, `${status}`)
                setCheckAll(false)
                blockedIds.push(u.id)
            } catch (e) {
                console.log(e)
            }
        }
        handleData()
    }

    const blockUser = () => {
        changeStatus('block')
    }

    const unBlockUser = () => {
        changeStatus('active')
    }


    const deleteUserById = async (id) => {
        try {
            await deleteUser(id)
        } catch (error) {
            console.log(error)
        }
    }

    const removeUser = async () => {
        const selectedUsers = users.users.filter((u) => u.checked)
        const deletedUserIds = []
        await Promise.all(selectedUsers.map(async (u) => {
            await deleteUserById(u.id)
            deletedUserIds.push(u.id)
            if (u.id === authUserId.id) {
                localStorage.removeItem('token')
                user.setUser({})
                user.setIsAuth(false)
            }
        }))
        const updatedUsers = users.users.filter((u) => !deletedUserIds.includes(u.id))
        users.setUsers(updatedUsers)
    }


    return (
        <Container>
            <ButtonGroup className="m-2">
                <Button variant="warning" onClick={blockUser}>Block</Button>
                <Button variant="success" onClick={unBlockUser}>Unblock</Button>
                <Button variant="danger" onClick={removeUser}>Delete</Button>
            </ButtonGroup>
            <Table responsive bordered hover>
                <thead>
                <tr>
                    <th>
                        <Form>
                            <div className="m-1">
                                <Form.Check
                                    type={'checkbox'}
                                    id={`select all`}
                                    label={`Select all`}
                                    checked={checkAll}
                                    onClick={handleCheckAll}
                                />
                            </div>
                        </Form>
                    </th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Last login</th>
                    <th>Registration time</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {users.users.map(u => {
                        return <tr>
                            <td><Form>
                                <div className="m-1">
                                    <Form.Check
                                        checked={u.checked || false}
                                        type={'checkbox'}
                                        id={u.id}
                                        label={'select'}
                                        value={u.id}
                                        onChange={() => handleCheck(u.id)}
                                    />
                                </div>
                            </Form></td>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.last_login_time}</td>
                            <td>{u.registration_time}</td>
                            <td>{u.status}</td>
                        </tr>
                    }
                )}
                </tbody>
            </Table>
        </Container>
    )
})

export default Panel