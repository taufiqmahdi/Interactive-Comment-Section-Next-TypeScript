const getDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date()
    const date = d.getDate().toString()
    const month = months[d.getMonth()]
    const year = d.getFullYear().toString()
    const today = date + " " + month + " " + year

    // return today
    return d.toString()
}

export default getDate