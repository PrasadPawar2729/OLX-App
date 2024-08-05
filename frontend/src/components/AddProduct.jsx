import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";
import './AddProduct.css'; // Import the external CSS file

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');
    const [status, setstatus] = useState('unsold'); // Default status is unsold

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    const handleApi = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('plat', position.coords.latitude);
            formData.append('plong', position.coords.longitude);
            formData.append('pname', pname);
            formData.append('pdesc', pdesc);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('pimage', pimage);
            formData.append('pimage2', pimage2);
            formData.append('userId', localStorage.getItem('userId'));
            formData.append('status', status); // Include status in form data

            const url = API_URL + '/add-product';
            axios.post(url, formData)
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message); 
                        navigate('/');
                    }
                })
                .catch((err) => {
                    alert('Server error');
                });
        });
    };

    return (
        <div className="add-product-container">
            <Header />
            <div className="card add-product-card">
                <div className="card-body add-product-card-body">
                    <h2 className="card-title">Add Product</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="pname" className="add-product-label">Product Name</label>
                            <input id="pname" className="form-control add-product-input" type="text" value={pname} onChange={(e) => setpname(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pdesc" className="add-product-label">Product Description</label>
                            <input id="pdesc" className="form-control add-product-input" type="text" value={pdesc} onChange={(e) => setpdesc(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="add-product-label">Product Price</label>
                            <input id="price" className="form-control add-product-input" type="text" value={price} onChange={(e) => setprice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="add-product-label">Product Category</label>
                            <select id="category" className="form-select add-product-input" value={category} onChange={(e) => setcategory(e.target.value)}>
                                <option>Select Category</option>
                                {categories.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pimage" className="add-product-label">Product Image</label>
                            <input id="pimage" className="form-control add-product-file-input" type="file" onChange={(e) => setpimage(e.target.files[0])} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pimage2" className="add-product-label">Product Second Image</label>
                            <input id="pimage2" className="form-control add-product-file-input" type="file" onChange={(e) => setpimage2(e.target.files[0])} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="add-product-label">Product Status</label>
                            <select id="status" className="form-select add-product-status-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                                <option value="unsold">Unsold</option>
                                <option value="sold">Sold</option>
                            </select>
                        </div>
                        <button type="button" onClick={handleApi} className="btn btn-primary add-product-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
