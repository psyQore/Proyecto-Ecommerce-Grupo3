import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';

import axios from 'axios';

// Componentes
import Product from './components/Product/Product.js';
import Catalogo from './components/Catalogo/Catalogo.js';
import CrudProduct from './components/CrudProduct/CrudProduct.js';

function App() {

  var [arrayProductos, setArrayProductos] = useState([]);
  var [categories, setCategories] = useState([]);
  useEffect(() => {
    axios({
      method:'GET',
      url:'http://localhost:3001/product/'
      }).then(function(res){
        setArrayProductos(res.data);
      });
    axios({
      method:'GET',
      url:'http://localhost:3001/category/'
      }).then(function(res){
        // console.log(res.data);
        setCategories(res.data);
      });
  }, []);

//devuelve el producto buscado o mensaje 
function onSearch(keyword) {
  if(keyword){
    var arraySearched = arrayProductos.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()) || product.keywords.toLowerCase().includes(keyword.toLowerCase()));
    setArrayProductos(arraySearched);
  } else {
    alert("No se han encontrado productos");
  }
};
//devuelve los productos de la categoria seleccionada
function onFilter(categories) {
  if(categories){ 
    var arrayFiltered =  arrayProductos.filter(product => product.categoria.name === categories) 
    setArrayProductos(arrayFiltered);
  } else {
    alert("No se encontraron productos para esa categoría");
  }  
}
//devuelve el producto seleccionado
function onSelect(id){
  let producto = arrayProductos.filter(producto => producto.id === parseInt(id));
  return producto[0];
}; 

  return (
    <div className="App">
       {/* PRODUCT Routes */}
     <Route
      exact
      path='/'
      component={() => <Catalogo arrayProductos={arrayProductos} onSearch={onSearch} onFilter={onFilter} categories={categories}/>}
     />
     <Route
      exact
      path='/producto/:id'
      component={({match}) => <Product productDetail={onSelect(match.params.id)} />}
     />

     {/* CRUD Routes */}
     <Route
      exact
      path='/panel-admin/producto/'
      component={() => <CrudProduct arrayProductos={arrayProductos} categories={categories}/>}
     />
    </div>
  );
}

export default App;
