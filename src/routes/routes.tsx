import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import Users from '../pages/dashboard/users';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Profile from '../pages/dashboard/profile';
import Notification from '../pages/dashboard/notification';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import AboutUs from '../pages/dashboard/about-us';
import Disclaimer from '../pages/dashboard/disclaimer';
import Category from '../pages/dashboard/category';
import Transactions from '../pages/dashboard/transactions';
import AppSliderList from '../pages/dashboard/banners';
import FAQ from '../pages/dashboard/faq';
import Subscription from '../pages/dashboard/package';
import PrivateRoute from '../provider/PrivateRoutes';
import Orders from '../pages/dashboard/orders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute>
            <App />
        </PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'orders', element: <Orders /> },
            { path: 'banners', element: <AppSliderList /> },
            { path: 'categories', element: <Category /> },
            // { path: 'chefs', element: <Category /> },
            { path: 'users', element: <Users /> },
            { path: 'transactions', element: <Transactions /> },
            { path: 'subscriptions', element: <Subscription /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
            { path: 'privacy-policy', element: <PrivacyPolicy /> },
            { path: 'terms-and-condition', element: <TermsAndCondition /> },
            { path: 'about-us', element: <AboutUs /> },
            { path: 'disclaimer', element: <Disclaimer /> },
            { path: 'faq', element: <FAQ /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
