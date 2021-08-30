import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Apartment from 'src/pages/Apartment';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ApartmentList from 'src/pages/ApartmentList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';


const routes = (isSignedIn) => [
  {
    path: 'app',
    element: isSignedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account/:id', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'apartment/:id', element: <Apartment /> },
      { path: 'apartment', element: <Apartment /> },
      { path: 'apartments', element: <ApartmentList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isSignedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'admin/login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
