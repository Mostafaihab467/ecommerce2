import React, { useEffect } from 'react';
import './App.scss';
import Footer from './Componets/Footer/Footer';
import Header from './Componets/Header/Header';
import HomeScreen from './screens/HomeSceen/HomeScreen';
import { Routes, Route } from 'react-router-dom'
import ProductScreen from './screens/Product/ProductScreen';
import agent from './agent/agent';
import { useDispatch } from 'react-redux';
import { InitProducts } from './store/Action/ProductAction';
import Cartscreen from './screens/CartScreen/Cartscreen';



function App(props:any) {




 const dispatch = useDispatch()

   
  useEffect(()=>{

    dispatch(InitProducts())

  },[])

  return (
    <div className="">
      <Header />
     
      <main className='main'>
      <Routes>
      <Route path="/"  element={<HomeScreen/>}/>
      <Route path="/Product/:id"  element={<ProductScreen />}>
        
        </Route>
      <Route path='/cart'  >
      <Route path="" element={<Cartscreen />} />
      <Route path=":id/" element={<Cartscreen />} />
      <Route path=":qty/" element={<Cartscreen />} />
      </Route>
      </Routes>
    
 

    
      </main>
    
      <Footer />
      
    </div>
  );
}

export default App;
