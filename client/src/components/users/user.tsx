import { User } from "../../types"

const Users = ({name, username, email, address,}: User) => {

    return (
        <>
            <li>
                <p>Name: {name}</p>
                <p>User Name: {username}</p>
                <p>Email: {email}</p>
                <p>Address: {address.city}-{address.city}</p>
            </li>
        </>
    )
}

export default Users