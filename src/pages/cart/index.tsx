import { useQuery } from "react-query"
import CartList from "../../components/cart"
import { GET_CART, CartType } from "../../graphql/cart"
import { graphqlFetcher, PQueryKeys } from "../../queryClient"

const Cart = () => {
    const { data } = useQuery(PQueryKeys.CART, () => graphqlFetcher(GET_CART), {
        staleTime: 0,
        cacheTime: 1000,
    })
    const cartItems = Object.values(data || {}) as CartType[]

    if(!cartItems.length) return <div>No List</div>
    return (
        <>
            <CartList items={cartItems} />
        </>
    )
}

export default Cart