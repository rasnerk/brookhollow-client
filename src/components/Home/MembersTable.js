import DataTable from "react-data-table-component"
import { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from "../../lib"

const MembersTable = () => {
    const [members, setMembers] = useState({ north: [], south: [] });

    const columns = useMemo(() => [
        {
            name: 'Lot #',
            selector: row => row.lots.length > 1 ? row.lots.map( (lot, index) => index === row.lots.length - 1 ? lot : `${lot}, ` ) : row.lots
        },
        {
            name: 'Name',
            selector: row => row.name
        },
        {
            name: 'Email',
            selector: row => row.email
        }
    ], [])

    useEffect(() => {
        async function fetchData() {
            const data = await fetchUsers();
            setMembers({...members, north: data.filter(d => d.division === "North"), south: data.filter(d => d.division === "South")})
        }
        fetchData()
    }, [])

    return (
        <>
            {Object.keys(members).map(division => (
                <DataTable
                    key={division}
                    title={`Residents (${division.charAt(0).toUpperCase() + division.slice(1)} Division)`}
                    data={members[division]}
                    columns={columns}
                    pagination
                />
            ))}
        </>
    )
}

export default MembersTable