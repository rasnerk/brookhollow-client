import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { fetchStatements } from "../../lib"

const Statements = () => {
    const [statements, setStatements] = useState([])

    const handleShow = (file) => window.open(`documents/Statements/${file}`, "_blank");

    useEffect(() => {
        async function fetchData() {
            const data = await fetchStatements()
            setStatements(data)
        }
        fetchData()
    },[])
    return (
        <>
            <h2 style={{textAlign: "center"}}><u>Bank Statements</u></h2>
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                {statements.length > 0 && statements.map(doc => (
                    <Button sx={{margin: 1}} key={doc.name} variant="contained" onClick={() => handleShow(doc.file)}>{doc.name}</Button>
                ))}
            </div>
        </>
    )
}

export default Statements