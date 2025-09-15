import './App.css';
import { Title, MantineProvider } from '@mantine/core';
import CardList from './components/CardList';
import '@mantine/core/styles.css';

function App() {
  return (
    <>
      <MantineProvider>
        <Title mb="20px" order={1}>
          SpaceX launches 2020
        </Title>
        <CardList />
      </MantineProvider>
    </>
  );
}

export default App;
