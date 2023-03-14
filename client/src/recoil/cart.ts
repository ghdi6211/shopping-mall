import { CartType } from './../graphql/cart';
import { atom, selectorFamily, useRecoilValue } from "recoil"


export const checkedCartState = atom<CartType[]>({
    key: 'cartState',
    default: [],

})

