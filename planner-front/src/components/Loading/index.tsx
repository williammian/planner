import React from 'react';
import { SyncLoader } from 'react-spinners';
import './style.css';

interface Props {
  loading: boolean;
}

const Loading = ({ loading } : Props) => {
  return (
    <>
        <div className={'loading-overlay'}>
            <SyncLoader color={'#343a40'} loading={loading} />
        </div>
    </>
  );
};

export default Loading;