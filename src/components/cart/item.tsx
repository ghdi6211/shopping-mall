import { ForwardedRef, forwardRef, SyntheticEvent } from "react"
import { useMutation } from "react-query"
import { CartType, DELETE_CART, UPDATE_CART } from "../../graphql/cart"
import { getClient, graphqlFetcher, PQueryKeys } from "../../queryClient"

const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount,
}: CartType, ref: ForwardedRef<HTMLInputElement>) => {
    const queryClient = getClient()
    const { mutate: updateCart } = useMutation(({ id, amount }: { id: string, amount: number }) =>
        graphqlFetcher(UPDATE_CART, { id, amount }),
        {
            onMutate: async ({ id, amount}) => {
                await queryClient.cancelQueries(PQueryKeys.CART)

                const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>(PQueryKeys.CART)
                if(!prevCart?.[id]) return prevCart

                const newCart = {
                    ...(prevCart || {}),
                    [id]: {...prevCart[id], amount},
                }
                queryClient.setQueryData(PQueryKeys.CART, newCart)

                return prevCart
            },
            onSuccess: newValue => {
                const prevCart = queryClient.getQueryData<{[key: string]: CartType}>(PQueryKeys.CART)
                const newCart = {
                    ...(prevCart || {}),
                    [id]: newValue,
                }
                queryClient.setQueryData(PQueryKeys.CART, newCart)
            },
        },
    )
    const {mutate: deleteCart} = useMutation(({id}: { id: string}) =>graphqlFetcher(DELETE_CART, { id }),
    {
        onSuccess: () => {
            queryClient.invalidateQueries(PQueryKeys.CART)
        }
    }
    )

    const handleUpdateAmont = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value)
        if(amount < 1) return
        updateCart(
            { id, amount }
        )
    }

    const handleDeleteItem = () => {
        deleteCart({id})
    }
    return (
        <>
            <li className="cart-item">
                <input className="cart-item__checkbox" type="checkbox" name={`select-item`} ref={ref}/>
                <img className="cart-item__image" src={imageUrl} />
                <p className="cart-item__price">{price}</p>
                <p className="cart-item__title">{title}</p>
                <input className="cart-item__amount" type="number"
                    value={amount} min={1} onChange={handleUpdateAmont} />
                <button className="cart-item__button" type="button"
                onClick={handleDeleteItem}>
                    Delete
                </button>
            </li>
        </>
    )
}
export default forwardRef(CartItem)