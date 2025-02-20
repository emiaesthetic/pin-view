import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Header from '@/layouts/Header';
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
          <>
            <Header />
          </>
        }
      />
    </Routes>
  );
};

export default App;
