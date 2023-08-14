import { useEffect, useState } from 'react'; 
import './App.css';
import CategoryList from './categoryList/categoryList';
import Header from './Header/header';
import Loading from './Loading/loading';
import FastFoodList from './FastFoodList/fastFoodList';
import FastFoodItem from './FastFoodItem/fastFoodItem';
import SearchBar from './SearchBar/searchBar';
import notFound from './assets/images/404.png';
import useAxios from './useAxios';
import axios from 'axios';

function App() {

const [url, setUrl]= useState('/FastFood/list');
const [fastFoodItem , ,loading] = useAxios({
  url
});


  const filterItems = (categoryId) => {
    setUrl( `/FastFood/list/${categoryId ? '?categoryId=' + categoryId:'' }`);
  }

  const searchItems = async(term) => {
   setUrl(`/FastFood/search/${term ? '?term=' + term : ""}`)
  }; 


  const renderContent = () => { 
    if(loading){
      return <Loading theme="dark"/>
    }

    if(fastFoodItem.length===0){
      return(
        <>
        <div className='alert alert-warning text-center'>
          برای کلید واژه ی فوق هیچ ایتمی یافت نشد
        </div>
        <img className='mx-auto mt-5 d-block fade-in-horiz' src={notFound}></img>
        </>
      )
    }


      return <FastFoodList fastFoodItem = {fastFoodItem}/>;
  }

  return (
    <div className='wrapper bg-faded-dark'>
      <Header></Header>
      <CategoryList filterItems={filterItems}>
        <SearchBar searchItems={searchItems}/>
      </CategoryList>
      <div className='container mt-4'> {renderContent()}</div>

    </div>
  );
}

export default App;