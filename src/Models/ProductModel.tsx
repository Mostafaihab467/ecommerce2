export interface ProductModel {
    _id: string,
    name: string,
    description: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
    image: any


}


export class C_Product {
    _id = ''
    name = ''
    description = ''
    brand = ''
    category = ''
    price = 0
    countInStock = 0
    rating = 0
    numReviews = 0
    image: any
    constructor(_id: string,
        name: string,
        description: string,
        brand: string,
        category: string,
        price: number,
        countInStock: number,
        rating: number,
        numReviews: number,
        image: any) {
        this._id = _id
        this.price = price,
        this.description = description,
        this.brand = brand,
        this.category = category,
        this.countInStock = countInStock
        this.rating = rating,
        this.numReviews = numReviews,
        this.image = image,
        this.name = name

    }
}