import { Card, Grid, Image, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const TeamImage = (props) => {
    const [imgUrl, setImgUrl] = useState();

    const getLink = () => {
        setImgUrl("https://drive.google.com/thumbnail?id="+props.image+"&sz=w1000");
    }

    useEffect(() => {
        console.log(props.image)
        getLink();
    }, [props])

    return (
        <Card>
            <Image src={imgUrl}></Image>
        </Card>
    )
}

export default TeamImage;
