import { createRef, SyntheticEvent, useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { CartType } from "../../graphql/cart"
import { checkedCartState } from "../../recoil/cart"
import CartItem from "./item"
import WillPay from "../willPay"
import { useNavigate } from "react-router"

const CartList = ({ items }: { items: CartType[] }) => {
    const [checkedCartDate, setCheckedCartDate] = useRecoilState(checkedCartState)
    const formRef = useRef<HTMLFormElement>(null)
    const checkboxRefs = items.map(() => createRef<HTMLInputElement>())
    const [formData, setFormData] = useState<FormData>()
    const navigate = useNavigate()

    const setAllCheckedFromItems = () => {
        //개별아이템 선택시
        if (!formRef.current) return
        const data = new FormData(formRef.current)
        const selectedCount = data.getAll('select-item').length
        const allChecked = (selectedCount === items.length)
        formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
    }

    const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
        //select-all 선택시
        const allChecked = targetInput.checked
        checkboxRefs.forEach(inputElem => {
            inputElem.current!.checked = allChecked
        })
    }
    const handleCheckboxChanged = (e?: SyntheticEvent) => {
        if (!formRef.current) return
        const targetInput = e?.target as HTMLInputElement
        if (targetInput && targetInput.classList.contains('select-all')) {
            setItemsCheckedFromAll(targetInput)
        } else {
            setAllCheckedFromItems()
        }
        const data = new FormData(formRef.current)
        setFormData(data)
    }
    const handleSubmit = () => {
        if (checkedCartDate.length) {
            navigate('/payment')
        } else {
            alert('No List')
        }
    }
    useEffect(() => {
        checkedCartDate.forEach((item => {
            const itemRef = checkboxRefs.find(ref => ref.current!.dataset.id === item.id)
            if (itemRef) itemRef.current!.checked = true
        }))
        setAllCheckedFromItems()
    }, [])
    useEffect(() => {
        const checkedItem = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
            if (ref.current!.checked) res.push(items[i])
            return res
        }, [])
        setCheckedCartDate(checkedItem)
    }, [items, formData])
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
            <WillPay submitTitle="Go to Payment" handleSubmit={handleSubmit} />
        </>
    )
}

export default CartList