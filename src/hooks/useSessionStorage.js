import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useSesionStorage=()=>{

    const key="access_token";

    const [value,setValue]=useState(null);
    const setItem=(value)=>{
        sessionStorage.setItem(key,value);
        setValue(value);
    };

    const getItem=()=>{
       const value= sessionStorage.getItem(key);
       setValue(value);
      return value;
    }

    const removeItem=()=>{
        sessionStorage.removeItem(key);
        setValue(null);
    };

    const decodeItem=()=>{
        const value= getItem();
        const decodedValue = jwtDecode(value);
        return decodedValue;
    };

    return {value,setItem,getItem,removeItem,decodeItem}
}