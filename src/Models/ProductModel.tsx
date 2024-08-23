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
    user:string,
    productsSecs:Array<ProductSpec>


}
export type ProductSpec = {
    key: string;
    value: string;
  };
  

export class C_Product implements ProductModel {
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
    user:string;
    productsSecs:Array<ProductSpec>;

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
        user:string,
        productsSecs:Array<ProductSpec>
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
        this.productsSecs = productsSecs;
    }
}

 const Emptyproduct = new C_Product("", "", "", "", "", 0, 0, 0, 0, "", "", [], "",[])
 export {Emptyproduct}