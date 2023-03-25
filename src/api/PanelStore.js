import {makeAutoObservable} from 'mobx'

export default class PanelStore{
    constructor(){
        this._users = []
        this._selectedUsers = []
        makeAutoObservable(this)
    }

    setUsers(users){
        this._users = users
    }

    setSelectedUsers(id){
        this._selectedUsers = id
    }

    get users(){
        return this._users
    }

    get selectedUsers(){
        return this._selectedUsers
    }


}
