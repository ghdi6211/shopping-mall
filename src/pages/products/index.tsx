import { useQuery } from "react-query"
import ProductItem from "../../components/product/item"
import GET_PRODUCTS, {Products} from "../../graphql/products"
import { graphqlFetcher, PQueryKeys } from "../../queryClient"

const ProductList = () => {
    const { data } = useQuery<Products>(PQueryKeys.PRODUCTS, () => graphqlFetcher(GET_PRODUCTS))
    
    

    return (
        <div>
            <h2>Product List</h2>
            <ul className="products">
                {data?.products?.map(product => (
                    <ProductItem {...product} key={product.id} />
                ))}
            </ul>
        </div>
    )
}

export default ProductList