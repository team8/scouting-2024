import { Header, Tabs, Grid, Title } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const AppHeader = (props) => {
  const { tabValue } = useParams();

  return (
      <Header height={{ base: 50, md: 70 }} p="md">
        <Grid>
          <Grid.Col span={7}>
            <Title order={1}>Scouting 2024</Title>
          </Grid.Col>
          <Grid.Col span={5}>
            <Tabs value={tabValue} defaultValue={props.defaultValue }variant="pills" onTabChange={(value) => { props.setEvent(value) }}>
              <Tabs.List position="right">
                <Tabs.Tab value="2024cave">Ventura County Regional 2024</Tabs.Tab>
                <Tabs.Tab value="2024azgl">Arizona East Regional 2024</Tabs.Tab>
                <Tabs.Tab value="2023utwv">Utah 2023</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Grid.Col>
        </Grid>
        
      </Header>
  )
}

export default AppHeader;