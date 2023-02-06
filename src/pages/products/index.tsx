import { useQuery } from "react-query"
import ProductItem from "../../components/product/item"
import { fetcher, QueryKeys } from "../../queryClient"
import { Product }from "../../types"

const ProductList = () => {
    const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () => fetcher({
        method: 'GET',
        path: '/products',
    }),
    )
    /*
    category: "electronics"
    description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty"
    id: 12
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"
    price: 114
    rating: {rate: 4.8, count: 400}
    title: "WD 4TB Gaming Drive Works with Playstation 4 Portable Externa
     */

    return (
        <div>
            <ul>
                {data?.map(product => (
                    <ProductItem {...product} key={product.id} />
                ))}
            </ul>
        </div>
    )
}

export default ProductList