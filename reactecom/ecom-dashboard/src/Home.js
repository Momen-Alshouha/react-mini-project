import { useState } from 'react';
import Header from './Header';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function AddProduct() {
    const naviage = useNavigate();

    const [name,setName] = useState("");
    const [file,setFile] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");

    async function addProduct() {
        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('description', description);

        let result = await fetch("http://127.0.0.1:8000/api/addproduct",{
            method:"POST",
            body:formData
        });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product Added Successfully',
            showConfirmButton: false,
            timer: 2000
          })

          naviage('/');
    }


    return (
       <>
        <Header />
        <h1 className="display-4">AddProduct</h1>
        <div className='col-sm-6 offset-sm-3'>
            <input onChange={(e) => setName(e.target.value)} type="text" className='form-control' placeholder='name' /> <br />
            <input onChange={(e) => setFile(e.target.files[0])} type="file" className='form-control' /> <br />
            <input onChange={(e) => setPrice(e.target.value)} type="text" className='form-control' placeholder='price' /> <br />
            <input onChange={(e) => setDescription(e.target.value)} type="text" className='form-control' placeholder='description' /> <br />
            <button onClick={addProduct} className='btn btn-primary'>Add Product</button>
        </div><br />
        <Footer />
       </>
    )
} 

export default AddProduct