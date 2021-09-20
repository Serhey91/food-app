import React from "react";
import {defaultCartState} from "./cart-reducer";
const CartContext = React.createContext(defaultCartState());

export default CartContext;


