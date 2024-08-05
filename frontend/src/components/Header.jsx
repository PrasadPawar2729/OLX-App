import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

function Header(props) {

   
    const [showOver, setshowOver] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    // let locations = [
    //     {
    //         "latitude": 28.6139,
    //         "longitude": 77.2090,
    //         "placeName": "New Delhi, Delhi"
    //     },
    //     {
    //         "latitude": 19.0760,
    //         "longitude": 72.8777,
    //         "placeName": "Mumbai, Maharashtra"
    //     },
    // ]

    return (
        <div className='header-container d-flex justify-content-between'>

            <div className="header">
                <Link className='links' to="/">  HOME </Link>

                <input className='search'
                    type='text'
                    value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
                    }
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > <FaSearch /> </button>
            </div>

            <div>







                <div
                    onClick={() => {
                        setshowOver(!showOver)
                    }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#002f34',
                        width: '40px',
                        height: '40px',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '50%'

                    }} >  <img  class="profile-img " src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=" alt=""/> </div>

                {showOver && <div style={{
                    minHeight: '50px',
                    width: '150px',
                    background: '#eee',
                    position: 'absolute',
                    top: '10',
                    right: '0',
                    zIndex: 1,
                    marginTop: '0px',
                    marginRight: '10px',
                    color: 'red',
                    fontSize: '14px',
                    background: '#002f34',
                    borderRadius: '7px',
                    textAlign:'center'
                }}>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/add-product">
                                <button className="logout-btn">ADD PRODUCT  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/liked-products">
                                <button className="logout-btn"> FAVOURITES  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-products">
                                <button className="logout-btn">MY ADS  </button>
                            </Link>}
                    </div>
                    <div>
                        {!localStorage.getItem('token') ?
                            <Link to="/login" className="login-link">LOGIN</Link>:
                            <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>}
                    </div>



                </div>}
            </div>

        </div>
    )
}


export default Header;