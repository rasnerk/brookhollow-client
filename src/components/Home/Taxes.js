import Button from "@mui/material/Button"
import { fetchTaxes } from "../../lib";
import { useEffect, useState } from "react";

const Taxes = () => {
    const [taxDocs, setTaxDocs] = useState([])
    
    const handleShow = (file) => window.open(`documents/Taxes/${file}`, "_blank");

    useEffect(() => {
        async function fetchData() {
            const data = await fetchTaxes();
            setTaxDocs(data)
        }
        fetchData()
    },[])
    return (
        <>
            <h2 style={{textAlign: "center"}}><u>Tax Documents</u></h2>
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                {taxDocs.length > 0 && taxDocs.map(doc => (
                    <Button sx={{margin: 1}} key={doc.name} variant="contained" onClick={() => handleShow(doc.file)}>{doc.name}</Button>
                ))}
            </div>
        </>
    )
}

export default Taxes