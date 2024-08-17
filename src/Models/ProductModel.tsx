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
    _id: string;
    name: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    image: any;

    constructor(
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
    ) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.category = category;
        this.price = price;
        this.countInStock = countInStock;
        this.rating = rating;
        this.numReviews = numReviews;
        this.image = image;
    }
}
