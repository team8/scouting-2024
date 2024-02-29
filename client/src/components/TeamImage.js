import { Card, Grid, Image, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const TeamImage = (props) => {
    const [id, setId] = useState();

    useEffect(() => {
        console.log(props)
        if (props.image) {
            let local = props.image.substring(33);
            setId(local);
        }
    }, [props])

    return (
        <Card>
            {
                id ? (<Image src={`https://lh3.googleusercontent.com/d/${id}`} />) : (<Text>No Image Preview Available</Text>)
                // id ? (<Image src="https://lh3.googleusercontent.com/d/17CKGEhR_B2CHgURSqs-_2Rfkkc6D9GK6" />) : (<Text>No Image Preview Available</Text>)
                
            }
        </Card>
    )
}

export default TeamImage;
