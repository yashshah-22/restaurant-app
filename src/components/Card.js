import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDispatchCart } from './ContextReducer';
import { useCart } from './ContextReducer';

const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const priceRef = useRef();
  const handleAddToCart = async () => {
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length > 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        return;
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        return;
      }
      return;
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  let food = [];

  return (
    <div style={{ margin: '10px' }}>
      <div className="card" style={{ width: "18rem", marginBottom: '20px' }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "cover" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">This is some important text.</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => (
                  <option key={data} value={data}>{data}</option>
                ))}
              </select>
            </div>
            <div className='fs-5'>₹{finalPrice}/-</div>
          </div>
          <hr />
          <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
