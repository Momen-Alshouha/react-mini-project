import Header from "./Header"
import Footer from "./Footer";
import React, {useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const fetchProducts = createAsyncThunk("products/fetchProducts",
    async (_,thunkAPI) => {
        let result = await fetch("http://127.0.0.1:8000/api/list");
        result =await result.json();
        return result;
    }

) //middleware 


const deleteProduct = createAsyncThunk("products/deleteProduct",
    async (id,thunkAPI) => {
        let result = await fetch("http://127.0.0.1:8000/api/delete/"+id,{
                    method:'DELETE'
                });
        
                result = await result.json();
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Product Deleted Successfully',
                    showConfirmButton: false,
                    timer: 2000
                  })
        return result;
    }

) //middleware 


const ProductsSlice = createSlice({
    name:'products',
    initialState:{data:[]},
    extraReducers:{
        [fetchProducts.pending]:(state,action)=>{
            
        },
        [fetchProducts.fulfilled]:(state,action)=>{
            state.data = action.payload;
        },
        [fetchProducts.rejected]:(state,action)=>{

        },
        [deleteProduct.pending]:(state,action)=>{
            
        },
        [deleteProduct.fulfilled]:(state,action)=>{
            state.data = state.data.filter((product)=> (!action.payload))
        },
        [deleteProduct.rejected]:(state,action)=>{

        },
    }
});



export function ProductList() {
    
    let counter=0;
    const dispatch = useDispatch();
    const data = useSelector( (state) => state.products.data);

    useEffect(() => {
      setTimeout(() => {
        dispatch(fetchProducts())
      }, 3000);
    },[])

    const deleteHandler = (id) => {
        dispatch(deleteProduct(id));
        
    }

    // async function deleteProduct(id) {
        
    //     let result = await fetch("http://127.0.0.1:8000/api/delete/"+id,{
    //         method:'DELETE'
    //     });

    //     result = await result.json();
        
    //     Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: 'Product Deleted Successfully',
    //         showConfirmButton: false,
    //         timer: 2000
    //       })
          
    //     fetchData();
    // }

    return (
        <>
        <Header />
            <h1 className="display-4">Products List</h1><br />
            {(data.length>0)?null:<h1 className="display-4"><br />Loading Products...<br /><br /></h1>}
            <Table className="container" striped bordered hover>
                {
                    (data.length>0?<thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                            <th>Product Image</th>
                            <th>ِAction</th>
                        </tr>
                    </thead>:null)
                }
                <tbody>
                {
                    data.map((product) => 
                       
                           <tr key={product.id}>
                                <td>{++counter}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td><img style={{width:"150px"}} src={"http://localhost:8000/"+product.file_path} alt="" /></td>
                                <td>
                                    <button onClick={() => deleteHandler(product.id)} className="btn btn-danger">Delete</button>
                                    <Link to={"update/"+product.id}><span className="btn btn-primary">update</span>   </Link>
                                </td>
                           </tr>
                        
                    )
                }
                </tbody>
            </Table>

            <Footer />
            
        </>
    )
}


export default ProductsSlice