import { useEffect, useState } from "react"

export default function UseProfile(){
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(respone => {
            respone.json().then(data => {
                setData(data);
                setLoading(false);
            })
        })
    }, [])

    return {loading, data};
}