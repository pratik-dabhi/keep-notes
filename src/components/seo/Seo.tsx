import { ISeo } from '../../interfaces/interfaces';
import { Helmet } from 'react-helmet';

const Seo = ({title,metaDescription}:ISeo) => {
  return (
        <Helmet>‍
          <title>{title}</title>‍
          <meta name="description" content={metaDescription} />        
        </Helmet>
  )
}

export default Seo