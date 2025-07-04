// src/App.tsx
import React, { useEffect } from 'react';
import './global.scss';
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
import Dashboard from './screens/Dashboard/Dashboard';
import { IntiateSocket } from './store/Action/SocketAction';
import { IUserModel } from './Models/userModel';
import Admins from './Componets/HOC/Admin'
import ProductImagesModal from './Componets/Widgets/Modal/AddProductSpecsModal/AddProductSpecsModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toast.css';
import './styles/responsive-fixes.css';
import './i18n';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent(props: any) {
  const { cachedPages, pageChange } = useSelector((state: any) => state.productRepo);
  const user = useSelector((state: any) => state.user.user) as IUserModel;
  const dispatch = useDispatch();
  const { isRTL } = useLanguage();

  useEffect(() => {
    dispatch(IntiateSocket());
    var x = [];
    if (!cachedPages.includes(pageChange)) {
      if (user?.isAdmin) {
        // ...
      }
      dispatch(InitProducts(pageChange));
      dispatch(SET_CURRENT_PAGE(pageChange));
    }
  }, [pageChange, user]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(SET_CURRENT_PAGE(pageNumber));
    dispatch(InitProducts(pageNumber));
  };

  return (
    <div className={`app-container ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeScreen onPageChange={handlePageChange} />} />
            <Route path="/dashboard" element={<Admins user={user || {}}><Dashboard /></Admins>} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="/product-images/:id" element={<ProductImagesModal />} />
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
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

function App(props: any) {
  return (
    <LanguageProvider>
      <AppContent {...props} />
    </LanguageProvider>
  );
}

export default App;



