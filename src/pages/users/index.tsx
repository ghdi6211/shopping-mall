

const UserList = () => {
    
    const getUserList = () => {

        let reqOption = {
            method: "get",
            hesaders: {
                "content-type" : "application/json"
            }
        }

        fetch("/api/userList", reqOption).then((res) => res.json()).
        then(data => console.log(data));
    }

    getUserList()

    return (
        <>
        </>
    )
}

export default UserList