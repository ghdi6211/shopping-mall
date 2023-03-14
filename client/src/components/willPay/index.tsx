import { SyntheticEvent } from "react"
import { useRecoilValue } from "recoil"
import { checkedCartState } from "../../recoil/cart"
import ItemData from "../cart/itemData"

const WillPay = ({
    submitTitle,
    handleSubmit,
}: {
    submitTitle: string,
    handleSubmit: (e: SyntheticEvent) => void
}) => {
    const checkedItem = useRecoilValue(checkedCartState)
    const totalPrice = checkedItem.reduce((res, { price, amount }) => {
        res += price * amount;
        return res
    }, 0)
    return (
        <div className="cart-willpay">
            <ul>
                {checkedItem.map(({ imageUrl, price, title, amount, id }) => (
                    <li key={id}>
                        <ItemData imageUrl={imageUrl} price={price} title={title} />
                        <p>Item: {amount}</p>
                        <p>Total: {price * amount}</p>
                    </li>
                ))}
            </ul>
            <div>
                {
                    checkedItem.length !== 0
                        ? <div>
                            <h3>All Total : {totalPrice}</h3>
                            <button onClick={handleSubmit}><h5>{submitTitle}</h5></button>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default WillPay