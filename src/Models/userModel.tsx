export interface IUserModel {
    email:string,
    password:string,
    name:string,
    token:string,
    isAdmin:boolean,
}

export class C_User {
    email =''
    password = ''
    name = ''
    token =''
    isAdmin=false

    constructor( email:string,password:string, name:string,token:string='', isAdmin:boolean=false){
        this.email= email
        this.isAdmin =isAdmin,
        this.name =name,
        this.password = password,
        this.token = token
        }
}