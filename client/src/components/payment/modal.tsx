import React from "react"
import { ReactChild } from "react"
import { createPortal } from "react-dom"

const ModalPortal = ({ children }: { children: any }) => {
    return createPortal(children, document.getElementById('modal')!)
}

const PaymentModal = ({ show, proceed, cancel }: { show: boolean, proceed: () => void, cancel: () => void }) => {

    return (
        show ? (
            <ModalPortal>
                <div className={`modal ${show ? 'show' : ''}`}>
                    <div className="modal__inner">
                        <p>Do you want Payment?</p>
                        <div>
                            <button onClick={proceed}>Yes</button>
                            <button onClick={cancel}>No</button>
                        </div>
                    </div>
                </div>
            </ModalPortal>
        ) : null

    )


}

export default PaymentModal