import { Route, Routes, useNavigate } from 'react-router-dom';

import Main from '../Pages/Main';
import ErrorPage from '../Pages/ErrorPage';
import ProductPage from '../features/product/ProductPage';
import Cart from '../features/cart/Cart';

import AuthPage from '../features/auth/AuthPage';
import SignUpPage from '../features/auth/SignUpPage';
import { useAppSelector } from '../hooks/redux';

const AppRouter = () => {
  const { email } = useAppSelector(state => state.auth);

  return (
    <Routes>
      {
        !email?
          <>
            <Route path="/register" element={<SignUpPage />}
            />
            <Route path="/*" element={<AuthPage />}
            />
          </>
        :
          <>
            <Route path="/" element={<Main />}
            />
            <Route path="/cart" element={<Cart />}
            />
            <Route path="/auth" element={<AuthPage />}
            />
            <Route path="/register" element={<SignUpPage />}
            />
            <Route path="products/:productId" element={<ProductPage />}
            />
            <Route path="/*" element={<ErrorPage />}
            />
          </>
      }

      


    </Routes >
  );
};

export default AppRouter;