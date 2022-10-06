import React from 'react';
import Dashboard from './Dashboard';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Dashboard />
      </ChakraProvider>
    </>
  );
};

export default App;
