
import Header from "./Header"
import { useEffect,useSate, useState } from "react"
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

function UpdateProduct(props) {
    let { id } = useParams();
    const [data,setData]=useState([]);

    async function fetchData(){
        let result = await fetch("http://127.0.0.1:8000/api/product/"+id)  
        result = await result.json();
        setData(result);
    }

    useEffect(() => {
        fetchData();   
    },)
    

    return (
      <>
        <Header />
        <h1 className="display-4">UpdateProduct</h1>
        <div className="col-sm-6 offset-sm-3">
            <label for="">Product Name</label>
            <input className="form-control" type="text" defaultValue={data.name} /><br />
            <label for="">Product Price</label>
            <input className="form-control" type="text" defaultValue={data.price} /><br />
            <label for="">Product description</label>
            <input className="form-control" type="text" defaultValue={data.description} /><br />
            <label for="">Product Image</label>
            <input className="form-control" type="file" defaultValue={data.file_path} /><br />
            <img style={{width:"150px"}} src={"http://127.0.0.1:8000/"+data.file_path} alt="" /><br /><br />
            <button className="btn btn-primary">Update Product</button>
        </div><br />
        <Footer />
      </>
    )
} 

export default UpdateProduct