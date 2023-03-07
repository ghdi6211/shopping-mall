import { createRef, SyntheticEvent, useRef } from "react"
import { useSetRecoilState } from "recoil"
import { CartType } from "../../graphql/cart"
import { checkedCartState } from "../../recoil/cart"
import CartItem from "./item"
import WillPay from "./willPay"

const CartList = ({ items }: { items: CartType[] }) => {
    const setCheckedCartDate =useSetRecoilState(checkedCartState)
    const formRef =useRef<HTMLFormElement>(null)
    const checkboxRefs =items.map(() => createRef<HTMLInputElement>())
    
    const handleCheckboxChanged = (e: SyntheticEvent) => {
        if(!formRef.current) return
        const targetInput = e.target as HTMLInputElement
        const data = new FormData(formRef.current)
        const selectedCount = data.getAll('select-item').length

        if(targetInput.classList.contains('select-all')) {
            const allChecked = targetInput.checked
            checkboxRefs.forEach(inputElem => {
                inputElem.current!.checked =allChecked
            })
        }else {
            const allChecked = (selectedCount ===items.length)
            formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
        }

        const checkedItem = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
            if(ref.current!.checked) res.push(items[i])
            return res
        }, [])
        setCheckedCartDate(checkedItem)
    }
    return (
        <>
            <h2>Cart List</h2>
            <form ref={formRef} onChange={handleCheckboxChanged}>
                <label>
                    <input className="select-all" name="select-all" type="checkbox" />
                    All Select
                </label>
                <ul className="cart">
                    {items.map((item, i) => (
                        <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
                    ))}
                </ul>
            </form>
            <WillPay />
        </>
    )
}

export default CartList