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
    image: any,
    imageFile:any,
    productimages:Array<string>,
    user:string


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
    image: any; // image url
    imageFile: any; // image File
    productimages:Array<string>
    user:string

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
        image: any,
        imageFile:any,
        productimages:Array<string>,
        user:string
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
        this.imageFile = imageFile
        this.productimages = productimages;
        this.user = user
    }
}
