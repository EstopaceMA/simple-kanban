import { Box, ChakraProvider, theme, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import KanbanBoardComponent from './components/KanbanBoardComponent';
import axios from 'axios';
import { API_BASE_URL } from './utils/constants';
import Footer from './components/Footer';

import packetworxLogo from './assets/packet_worx_image.webp';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${API_BASE_URL}/tasks`,
    })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <div
        style={{
          minHeight: 'calc(100vh - 105px)',
        }}
      >
        <div
          style={{
            marginTop: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            height: '5vh',
          }}
        >
          {/* <h1 style={{ textAlign: 'center' }}>Simple Kanban</h1> */}
          <Box width={'300px'}>
            <h1>Simple Kanban App</h1>
          </Box>
        </div>
        <KanbanBoardComponent data={data} />
      </div>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
