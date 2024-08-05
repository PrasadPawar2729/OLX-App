import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css'; 
import API_URL from "../constants";


function Home() {
    const navigate = useNavigate();

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);

    useEffect(() => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, []);

    const handlesearch = (value) => {
        setsearch(value);
    };

    const handleClick = () => {
        const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                setcproducts(res.data.products);
                setissearch(true);
            })
            .catch((err) => {
                alert('Server Err.');
            });
    };

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => item.category === value);
        setcproducts(filteredProducts);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.');
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.');
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    };

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    return (
        <div className="product-container">
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            {issearch && cproducts &&
                <h5>
                    SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setissearch(false)}>CLEAR</button>
                </h5>}
            
            {issearch && cproducts && cproducts.length === 0 && <h5>No Results Found</h5>}
            
            <div className="d-flex justify-content-center flex-wrap">
                {issearch ? (
                    cproducts.map((item) => (
                        <div key={item._id} className="card m-3">
                            <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                                <FaHeart className="icons" />
                            </div>
                            <img width="300px" height="200px" src={API_URL + '/' + item.pimage} alt={item.pname} />
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                            <p className="m-2 text-success">{item.pdesc}</p>
                            <span className={`status-label ${item.status && item.status.toLowerCase() === 'sold' ? 'sold' : 'unsold'}`}>
                                {item.status ? item.status.toUpperCase() : 'UNSOLD'}
                            </span>
                        </div>
                    ))
                ) : (
                    products.map((item) => (
                        <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
                            <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                                <FaHeart className="icons" />
                            </div>
                            <img width="250px" height="150px" src={API_URL + '/' + item.pimage} alt={item.pname} />
                            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <p className="m-2 text-success">{item.pdesc}</p>
                            <span className={`status-label ${item.status && item.status.toLowerCase() === 'sold' ? 'sold' : 'unsold'}`}>
                                {item.status ? item.status.toUpperCase() : 'UNSOLD'}
                            </span>
                        </div>
                    ))
                )}
            </div>
        
        </div>
        
    );
}

export default Home;

