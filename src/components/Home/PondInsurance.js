// import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
const PondInsurance = () => {
    const handleShow = () => {
        window.open("documents/PondPolicy.pdf", "_blank")
    }
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Button variant="contained" onClick={handleShow}>View Pond Policy</Button>
        </div>
    )
}

export default PondInsurance