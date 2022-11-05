import Button from "@mui/material/Button"

const Rules = () => {

    const handleRulesShow = () => {
        window.open("documents/CovenantsandPlatMap.pdf", "_blank")
    }
    
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Button variant="contained" onClick={handleRulesShow}>View Rules & Regulations</Button>
        </div>
    )
}

export default Rules