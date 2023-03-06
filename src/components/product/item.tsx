import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ADD_CART } from "../../graphql/cart";
import { Product } from "../../graphql/products";
import { graphqlFetcher, PQueryKeys } from "../../queryClient";
import { cartItemSelector } from "../../recoils/cart";

const ProductItem = ({ id, imageUrl, price, title, description, createdAt}: Product) => {
const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, {id}))
    return (
        <li className="product-item">
            <Link to={`/products/${id}`}>
            <p className="product-item_title">{title}</p>
            <img className="product-item_image" src={imageUrl} />
            <span className="product-item_price">${price}</span>
            </Link>
            <button className="product-item_add-cart" onClick={() => addCart(id)}>add to cart</button>
        </li>
    )
}


export default ProductItem