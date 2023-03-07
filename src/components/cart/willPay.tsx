import { useRecoilValue } from "recoil"
import { checkedCartState } from "../../recoil/cart"
import ItemData from "./itemData"

const WillPay = () => {
    const checkedItem = useRecoilValue(checkedCartState)
    const totalPrice = checkedItem.reduce((res, {price, amount}) => {
        res += price * amount;
        return res
    }, 0)

    return (
        <div className="cart-willpay">
            <ul>
                {checkedItem.map(({ imageUrl, price, title, amount, id }) => (
                    <li>
                        <ItemData imageUrl={imageUrl} price={price} title={title} key={id} />
                        <p>Item: {amount}</p>
                        <p>Total: {price * amount}</p>
                    </li>
                ))}
            </ul>
            <div>
                {
                 checkedItem.length !== 0
                 ?<h3>All Total : {totalPrice}</h3>
                 :null
                }
            </div>
        </div>
    )
}

export default WillPay