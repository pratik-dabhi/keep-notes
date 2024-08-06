import { createContext } from 'react';
import { ILoaderContext } from '../interfaces/interfaces';

const LoaderContext = createContext<ILoaderContext>({
    isLoading: false,
    setLoading: () => {}
});

export default LoaderContext;
