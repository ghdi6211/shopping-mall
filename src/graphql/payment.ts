import gql from "graphql-tag";

export const EXECUTE_PAY = gql`
    mutation ADD_CART($id: string) {
        cart(id: $id) {
            id
            imageUrl
            price
            title
            amount
        }
    }

`