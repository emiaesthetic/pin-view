import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Gallery from '@/components/Gallery';
import Header from '@/components/Header';
import Main from '@/components/Main';
import PageNotFound from '@/components/PageNotFound';
import Pin from '@/components/Pin';
import { HeaderHeightProvider } from '@/providers/headerHeight';
import { ScrollProvider } from '@/providers/scroll';
import { getToken } from '@/services/tokenStorage';
import { updateToken } from '@/store/token/tokenSlice';

const App = () => {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <Routes>
      <Route
        element={
          <HeaderHeightProvider>
            <Header />
            <ScrollProvider>
              <Main />
            </ScrollProvider>
          </HeaderHeightProvider>
        }
      >
        <Route path="/" element={<Gallery />} />
        <Route path="/photos/:search" element={<Gallery />} />
        <Route path="/photo/:pinID" element={<Pin />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
