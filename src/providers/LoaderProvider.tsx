import { useState } from 'react';
import LoaderContext from '../context/LoaderContext'
import { IChildrenProps } from '../interfaces/interfaces'
import Loader from '../components/common/Loader';

const LoaderProvider = ({children}:IChildrenProps) => {

  const [isLoading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading }}>
        {children}
        {isLoading && <Loader/>} 
    </LoaderContext.Provider>
  )
}

export default LoaderProvider