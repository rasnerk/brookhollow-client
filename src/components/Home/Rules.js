import Button from "@mui/material/Button"

const Rules = () => {

    const handleRulesShow = () => {
        window.open("documents/CovenantsandPlatMap.pdf", "_blank")
    }
    
    return (
        <>
            <h2 style={{textAlign: "center"}}><u>Rules & Regulations</u></h2>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Button variant="contained" onClick={handleRulesShow}>View Rules & Regulations</Button>
            </div>
        </>
    )
}

export default Rules