export interface IShiiping {
    city: string,
    address: string,
    postalCode: string,
    country: string

}

export class C_Shipping {
    city = ''
    address = ''
    postalCode = ''
    country = ''
    constructor(city: string = '', address: string = '', postalCode: string = '', country: string = '') {
        this.address = address
        this.city = city
        this.postalCode = postalCode
        this.country = country
    }
}