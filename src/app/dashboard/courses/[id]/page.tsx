import { Box } from "@mui/material"
import { useParams } from "next/navigation"

const EditCoursePage = () => {
    const params = useParams()
    const {id} = params
    return <Box>Edit Course {id}</Box>
}
export default EditCoursePage