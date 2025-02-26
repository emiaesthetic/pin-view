import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import HeaderHeightProvider from '@/context/headerHeight';
import Header from '@/layouts/Header';
import Main from '@/layouts/Main';
import { getToken } from '@/services/tokenStorage';
import { updateToken } from '@/store/token/tokenSlice';

const App = () => {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <Routes>
      <Route
        path="*"
        element={
          <HeaderHeightProvider>
            <Header />
            <Main />
          </HeaderHeightProvider>
        }
      />
    </Routes>
  );
};

export default App;
