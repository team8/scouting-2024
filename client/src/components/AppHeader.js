import { Header, Tabs, Grid, Title } from "@mantine/core";
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
            <Tabs value={tabValue} defaultValue="2024cave" variant="pills" onTabChange={(value) => { props.set(value) }}>
              <Tabs.List position="right">
                <Tabs.Tab value="2024cave">Ventura County Regional 2024</Tabs.Tab>
                <Tabs.Tab value="2024azgl">Arizona East Regional 2024</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Grid.Col>
        </Grid>
        
      </Header>
  )
}

export default AppHeader;