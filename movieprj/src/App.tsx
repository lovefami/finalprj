import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/index';
import BrowseContainer from './containers/BrowseContainer';
import ShowPage from './components/ShowPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />

        <Routes>
          <Route path = "/" element ={<ShowPage />} />
          <Route path="/browse" element={<BrowseContainer />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
