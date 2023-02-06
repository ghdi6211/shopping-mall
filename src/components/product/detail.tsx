import { Product } from "../../types"

const ProductDetail = ({
    item: {
        category,
        title,
        description,
        image,
        price,
        rating
    }
}: {
    item: Product
}

) => {
    return(
    <div className="product-detail">
        <p className="product-detail_category">{category}</p>
        <p className="product-detail_title">{title}</p>
        <p className="product-detail_description">{description}</p>
        <img className="product-detail_image" src={image} />
        <span className="product-detail_price">${price}</span>
        <span className="product-detail_rating">{rating.rate}</span>
    </div>
)}

export default ProductDetail