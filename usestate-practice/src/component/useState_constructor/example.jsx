import React, { useState } from "react";
import { useRef, useReducer } from 'react';
import "./example.css";

export default function State({data}){
    function useConstructor(initialValue) {
        const valueRef = useRef(initialValue); // Sử dụng useRef để lưu trữ giá trị mà không mất đi qua các lần render
        const [, forceRender] = useReducer(x => x + 1, 0); // Cơ chế trigger render lại
    
        const setConstructor = (newValue) => {
            if (typeof newValue === 'function') {
                valueRef.current = newValue(valueRef.current); // Cho phép cập nhật giá trị dựa trên giá trị hiện tại
            } else {
                valueRef.current = newValue; // Cập nhật giá trị trực tiếp
            }
            forceRender(); // Trigger re-render
        };
        return [valueRef.current, setConstructor]; // Trả về giá trị và hàm cập nhật
    }

    const [productInstock, setProductInstock] = useConstructor(data);
    // const [showProduct, setShowProduct] = useConstructor(false);

    function handle(event){
        const itemIndex = parseInt(event.target.id)+1;
        const item = productInstock.map((index)=>{
            if (index.id === itemIndex){
                return {...index, instock:!index.instock}
            }
            return index;
        })
        setProductInstock(item)
    }

    return(
        <div className="product-item">
            {productInstock.map((item, index)=>{
                return (
                    <div key={index} onClick={handle}>
                        <p id={index} style={{textDecoration: item.instock ? "none": "line-through"}}>Name: {item.name} <br/> Price: ${item.price}</p>
                    </div>
                )
            })}
        </div>
    )
}