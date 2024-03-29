
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios'
import { AppRoutes } from './router/AppRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { setupAxios } from './auth/auth';
import AuthProvider from './context/authContext';



setupAxios(axios)

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>


    <AuthProvider>
      <AppRoutes />
    </AuthProvider>

  </QueryClientProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
