import {FC} from 'react'
import ReactLoading from 'react-loading';

import './Loading.css';

const Loading: FC = () => {
  return (
    <div className="loading-all">
        <ReactLoading type='spin' color='#D5D5D5' height={50} width={50} />
    </div>
  )
}

export {Loading}
