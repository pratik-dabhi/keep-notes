import React from 'react';

type TAuthGuard = {
    children: React.ReactNode | React.LazyExoticComponent<React.ComponentType>; 
};

const AuthGuard: React.FC<TAuthGuard> = ({ children }) => {
    return <>{children}</>;
};

export default AuthGuard;
