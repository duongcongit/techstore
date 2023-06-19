import Home from "../components/pages/Home";
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';


export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
]

export const privateRoutes = [
    
]