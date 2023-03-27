import {makeAutoObservable} from 'mobx'

export default class PanelStore{
    constructor(){
        this._users = []
        makeAutoObservable(this)
    }

    setUsers(users){
        this._users = users
    }

    get users(){
        return this._users
    }
}
