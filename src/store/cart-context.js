import React from "react";
import {defaultCartState} from "./CartProvider";
const CartContext = React.createContext(defaultCartState());

export default CartContext;


