import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UpdateProduct from './UpdateProduct';
import AddProduct from './AddProduct';
import Login from './Login';
import Register from './Register';
import Protected from './Protected';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/add' element={<Protected component={AddProduct} />} />
          <Route path='/' element={<Protected component={ProductList} />} />
          <Route path='/update/:id' element={<Protected component={UpdateProduct} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
