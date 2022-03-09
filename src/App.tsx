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




function App() {




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
      <Route path="/Product/:id"  element={<ProductScreen />}/>
      </Routes>
   
 

    
      </main>
    
      <Footer />
      
    </div>
  );
}

export default App;
