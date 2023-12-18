import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            const response = await fetch("https://restaurant-app-mernstack-22.vercel.app/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail
                })
            });

            if (response.ok) {
                const data = await response.json();
                setOrderData(data.orderData);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data
                        ? orderData.order_data.slice(0).reverse().map((item, index) => (
                            <div key={index}>
                                {item.Order_date && (
                                    <div className='m-auto mt-5'>
                                        {item.Order_date}
                                        <hr />
                                    </div>
                                )}
                                {!item.Order_date && (
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            {/* <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <span className='m-1'>{item.Order_date}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                        : "No orders available."
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}
