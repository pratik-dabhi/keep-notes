import React, { createContext } from 'react';
import { IAuthContext, IUserDetails } from '../interfaces/interfaces';

const AuthenticationContext = createContext<IAuthContext>({
  Logout: () => {},
  Login: (userDetails: IUserDetails) => {},
  loggedUser: null,
});

export default AuthenticationContext;
