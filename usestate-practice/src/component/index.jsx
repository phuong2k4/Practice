import React from "react";
import State from "./useState_constructor/example";

export default function Data(){
    const data_Storage = [
        {
            id: 1,
            name: "pencil",
            price: 99,
            instock: true
        },
        {
            id: 2,
            name: "monitor",
            price: 999,
            instock: true
        },
        {
            id: 3,
            name: "glass",
            price: 299,
            instock: false
        },
        {
            id: 4,
            name: "mouse",
            price: 599,
            instock: true
        }
    ]

    return (
        <State data={data_Storage}/>
    )
}