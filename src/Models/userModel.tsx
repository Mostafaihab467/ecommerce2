export interface IUserModel {
    _id:string
    email:string,
    password:string,
    name:string,
    token:string,
    isAdmin:boolean,
}

export class C_User {
    _id=''
    email =''
    password = ''
    name = ''
    token =''
    isAdmin=false

    constructor( email:string,password:string, name:string,token:string='', isAdmin:boolean=false,_id?:string){
        this.email= email
        this.isAdmin =isAdmin,
        this.name =name,
        this.password = password,
        this.token = token,
        this._id=_id!
        }
}