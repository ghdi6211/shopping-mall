import React from "react"
import { useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router"
import { useRecoilState } from "recoil"
import { EXECUTE_PAY } from "../../graphql/payment"
import { graphqlFetcher, PQueryKeys } from "../../queryClient"
import { checkedCartState } from "../../recoil/cart"
import WillPay from "../willPay"
import PaymentModal from "./modal"

type PaymentInfos = string[];

const Payment = () => {
    const navigate = useNavigate()
    const [checkedCartDate, setCheckedCartDate] = useRecoilState(checkedCartState)
    const [modalShow, toogleModal] = useState(false)
    const { mutate: executePay} = useMutation(
        (payInfos: PaymentInfos) => graphqlFetcher(EXECUTE_PAY, payInfos)
    )
    const showModal = () => {
        toogleModal(true)
    }

    const proceed = () => {
        //결제진행
        const payInfos = checkedCartDate.map(({ id }) => (id))
        executePay(payInfos)
        setCheckedCartDate([])
        alert('Complete Payment!! Thank you.')
        navigate('/products', {replace: true})
    }

    const cancel = () => {
        toogleModal(false)
    }
    return (
        <>
            <WillPay submitTitle="Payment" handleSubmit={showModal}/>
            <PaymentModal show={modalShow} proceed={proceed} cancel={cancel}/>
        </>
    )
}

export default Payment