import { C_Product, ProductModel } from "./../../Models/ProductModel";

let initialState = {
  AllProducts: new Array<C_Product>(),
  product: new Array<C_Product>(),
  pageChange:1,
  cachedPages: [],
  selectedProduct: new C_Product("", "", "", "", "", 0, 0, 0, 0, 0,"null"),
  filters: {
    categories: [] as string[],
    priceRange: { min: 0, max: Infinity },
    brands: [] as string[],
    ratings: [] as number[],
    availability: [] as string[],
    shippingOptions: [] as string[],
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 1
  }
};

export interface Action {
  type: string;
  payload: any;
  id: string;
  totalPages: number;
  pageNumber?: number;
}

const productReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "INITPRODS":
      return {  
        ...state, 
        product: [...state.product, ...action.payload],
        AllProducts: action.payload,
        pagination: {
          ...state.pagination,
          totalPages: action.totalPages
        }
      };
    case 'USER_ADD_PRODUCT':
        return {...state}

    case "SET_CURRENT_PAGE":
      return { 
        ...state, 
        pagination: {
          ...state.pagination,
          currentPage: action.payload
        },
        cachedPages: [...state.cachedPages,action.payload].sort() // Ensure immutability
      };
      case "HANDEL_PAGE_CHANGE":
        return { 
            ...state,
            pageChange:action.payload
        }


    case "SET_TOTAL_PAGES":
      return { 
        ...state, 
        pagination: {
          ...state.pagination,
          totalPages: action.payload
        }
      };

    case "SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };

    case "UPDATE_PRODUCT":
      var prod = action.payload as ProductModel;
      return { 
        ...state, 
        product: state.product.map(p => p._id === prod._id ? prod : p) // Use map for immutability
      };

    case "DELETE_PRODUCT":
      return { 
        ...state, 
        product: state.product.filter(p => p._id !== action.payload) // Use filter for immutability
      };

    case 'SET_FILTERS':
      const filteredProducts = applyFilters(state.AllProducts, action.payload);
      return { 
        ...state, 
        filters: action.payload, 
        product: filteredProducts,
        pagination: {
          ...state.pagination,
          totalPages: Math.ceil(filteredProducts.length / state.pagination.itemsPerPage)
        }
      };

    default:
      return state;
  }
};

const applyFilters = (products: C_Product[], filters: any) => {
  return products.filter(product => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    if (filters.ratings.length > 0 && !filters.ratings.some((rating: number) => product.rating >= rating)) {
      return false;
    }
    if (filters.availability.length > 0 && !filters.availability.includes(product.countInStock > 0 ? 'in-stock' : 'out-of-stock')) {
      return false;
    }
    return true;
  });
};

export default productReducer;
