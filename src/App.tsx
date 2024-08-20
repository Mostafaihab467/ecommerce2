// src/App.tsx
import React, { useEffect } from 'react';
import './App.scss';
import Footer from './Componets/Footer/Footer';
import Header from './Componets/Header/Header';
import HomeScreen from './screens/HomeSceen/HomeScreen';
import { Routes, Route } from 'react-router-dom';
import ProductScreen from './screens/Product/ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import { InitProducts, SET_CURRENT_PAGE } from './store/Action/ProductAction';
import Cartscreen from './screens/CartScreen/Cartscreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen/RegistrationScreen';
import Shipping from './screens/Shipping/Shipping';
import PaymentScreen from './screens/Payment/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import ListMyOrder from './screens/ListMyOrder/ListMyOrder';
import ProfileScreen from './screens/MyProfile/ProfileScreen';
import UsersScreen from './screens/UsersScreen/UsersScreen';
import AdminsEditScreen from './screens/Admin/ProductScreen/AdminsEditScreen';
import Sidebar from './Componets/Widgets/Filtration/Filtration';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProductForm from './screens/AddProduct/AddProductScreen';




function App(props: any) {
  const { currentPage, itemsPerPage, totalPages } = useSelector((state: any) => state.productRepo.pagination);
  const { cachedPages,pageChange }  = (useSelector((state: any) => state.productRepo)) ; 
  const dispatch = useDispatch();

  window.addEventListener('resize', () => {
    console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
});

  

  useEffect(() => {
    // Initialize products on component mount
    //API Key = FernCsYysABnnUyK8HcriX2a
var x = []
  if(!cachedPages.includes(pageChange)){

    dispatch(InitProducts(pageChange)); // Fetch the first page by default
    dispatch(SET_CURRENT_PAGE(pageChange))
  }

    
  }, [pageChange]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(SET_CURRENT_PAGE(pageNumber)); // Update the current page
    dispatch(InitProducts(pageNumber)); // Fetch products for the selected page
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeScreen onPageChange={handlePageChange} />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="/Product/:id" element={<ProductScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeOrder" element={<PlaceOrderScreen />} />
            <Route path="/OrderScreen" element={<OrderScreen />} />
            <Route path="/MyOrders" element={<ListMyOrder />} />
            <Route path="/MyProfile" element={<ProfileScreen />} />
            <Route path="/AlUsers" element={<UsersScreen />} />
            <Route path="/AddProduct" element={<AddProductForm />} />
            <Route path="/AdminsEditScreen" element={<AdminsEditScreen />} />
            <Route path="/cart">
              <Route path="" element={<Cartscreen />} />
              <Route path=":id/" element={<Cartscreen />} />
              <Route path=":qty/" element={<Cartscreen />} />
            </Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
