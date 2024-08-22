export interface IStatstics{
 electronics:number,
 cloth:number,
 books:number,
 food:number,
 totalProducts:number

}



export class C_Statstics{
    electronics = 0
    cloth = 0
    books = 0
    food = 0
    totalProducts = 0
    constructor(electronics:number=0,cloth:number=0,books:number=0,food:number=0,totalProducts:number=0){
        this.electronics = electronics
        this.cloth = cloth
        this.books = books
        this.food = food
        this.totalProducts = totalProducts
    }
 
}