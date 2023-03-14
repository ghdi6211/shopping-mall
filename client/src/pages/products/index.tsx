import { useQuery } from "react-query"
import ProductList from "../../components/product/list"
import GET_PRODUCTS, { Products } from "../../graphql/products"
import { graphqlFetcher, PQueryKeys } from "../../queryClient"

const ProductListPage = () => {
    const { data } = useQuery<Products>(PQueryKeys.PRODUCTS, () => graphqlFetcher(GET_PRODUCTS))



    return (
        <div>
            <h2>Product List</h2>
            <ProductList list={data?.products || []}/>
        </div>
    )
}

export default ProductListPage