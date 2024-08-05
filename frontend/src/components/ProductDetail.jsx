import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import './ProductDetail.css'; // Import external CSS file for styling

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading indicator
    const { productId } = useParams(); // Destructuring productId from URL parameters

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `${API_URL}/get-product/${productId}`;
                const response = await axios.get(url);
                if (response.data.product) {
                    setProduct(response.data.product);
                    setLoading(false); // Turn off loading indicator on successful fetch
                } else {
                    setLoading(false); // Handle case where product is not found
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                alert('Server Error. Please try again later.'); // Basic error handling
                setLoading(false); // Turn off loading indicator on error
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleContact = (addedBy) => {
        const url = `${API_URL}/get-user/${addedBy}`;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
                alert('Server Error. Please try again later.'); // Basic error handling
            });
    };

    return (
        <div className="product-detail-container">
            <Header />
            <div className="product-details">
                <h2>Product Details</h2>
                {loading ? (
                    <p>Loading...</p> // Display loading indicator while fetching data
                ) : product ? (
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="product-images">
                            <img src={`${API_URL}/${product.pimage}`} alt="" />
                            {product.pimage2 && <img src={`${API_URL}/${product.pimage2}`} alt="" />}
                            <h6>Product Description:</h6>
                            <p>{product.pdesc}</p>
                        </div>
                        <div className="product-info">
                            <h3 className="price-text">Rs. {product.price} /-</h3>
                            <p>{product.pname} | {product.category}</p>
                            {product.addedBy && (
                                <button className="btn btn-primary" onClick={() => handleContact(product.addedBy)}>
                                    Show Contact Details
                                </button>
                            )}
                            {user && (
                                <div className="contact-details">
                                    <h4>{user.username}</h4>
                                    <h3>{user.mobile}</h3>
                                    <h6>{user.email}</h6>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>No product found.</p> // Display message if product is not found
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
