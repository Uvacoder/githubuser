import { createTheme, ThemeProvider } from '@mui/material/styles';
// import IssuesPage from './pages/Issues.page';
// import UserPage from './pages/Users.page';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { lazy, Suspense } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';

const IssuesPage = lazy(() => import('./pages/Issues.page'));
const UserPage = lazy(() => import('./pages/Users.page'));

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GITHUB_API,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  },
  cache,
});

const theme = createTheme();

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<UserPage />} />
              <Route exact path='/Issues' element={<IssuesPage />} />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
