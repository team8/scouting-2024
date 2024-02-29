import { Header, Tabs, Grid, Title } from "@mantine/core";
import { useNavigate, useParams } from 'react-router-dom';

const AppHeader = (props) => {
  const { tabValue } = useParams();

  return (
      <Header height={{ base: 50, md: 70 }} p="md">
        <Grid>
          <Grid.Col span={7}>
            <Title order={1}>Scouting 2023</Title>
          </Grid.Col>
          <Grid.Col span={5}>
            <Tabs value={tabValue} defaultValue="2023idbo" variant="pills" onTabChange={(value) => { props.set(value) }}>
              <Tabs.List position="right">
                <Tabs.Tab value="2023idbo">Idaho Regional 2023</Tabs.Tab>
                <Tabs.Tab value="2023cacc">Capital City Classic 2023</Tabs.Tab>
                <Tabs.Tab value="2023cacg">Calgames 2023</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Grid.Col>
        </Grid>
        
      </Header>
  )
}

export default AppHeader;