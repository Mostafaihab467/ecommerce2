import { C_Product, ProductModel } from "./../../Models/ProductModel";
let intialState = {
  AllProducts: new Array<C_Product>(),  
  product: new Array<C_Product>(),
  selectedProduct: new C_Product("", "", "", "", "", 0, 0, 0, 0, 0),
  filters: {
    categories: [] as string[],
    priceRange: { min: 0, max: Infinity },
    brands: [] as string[],
    ratings: [] as number[],
    availability: [] as string[],
    shippingOptions: [] as string[],
  },
};

export interface Action {
  type: string;
  payload: any;
  id: string;
}

const productReducer = (state = intialState, action: Action) => {
  switch (action.type) {
    case "INITPRODS":
      return { ...state, product: [...action.payload][0],AllProducts: action.payload[0]};



    case "SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };

    case "UPDATE_PRODUCT":
      var prod = action.payload as ProductModel;
      state.product = state.product.filter((x) => x._id !== prod._id);
      return { ...state, product: [...state.product, prod] };

    case "DELETE_PRODUCT":
      state.product = state.product.filter((x) => x._id !== action.payload);
      return { ...state, product: [...state.product] };

      case 'SET_FILTERS':
        // Apply filters to products
        state.product = state.AllProducts
        const filteredProducts = applyFilters(state.product, action.payload);
        return { ...state, filters: action.payload, product: filteredProducts };
    default:
      return state;
  }
};
























const applyFilters = (products: C_Product[], filters: any) => {
    return products.filter(product => {
        // Filter by category
        if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
            return false;
        }

        // Filter by price range
        if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
            return false;
        }

        // Filter by brand
        if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
            return false;
        }

        // Filter by rating
        if (filters.ratings.length > 0 && !filters.ratings.some((rating:number) => product.rating >= rating)) {
            return false;
        }

        // Filter by availability
        if (filters.availability.length > 0 && !filters.availability.includes(product.countInStock > 0 ? 'in-stock' : 'out-of-stock')) {
            return false;
        }

        // // Filter by shipping options
        // // Assuming you have shipping options in your product model
        // if (filters.shippingOptions.length > 0 && !filters.shippingOptions.some((option:any) => product.shippingOptions.includes(option))) {
        //     return false;
        // }

        return true;
    });
};

export default productReducer;
