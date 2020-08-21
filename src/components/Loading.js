import React from 'react';
import ReactLoading from 'react-loading';

function Loading(props) {
    return (
        <div className="loading">
            <ReactLoading type={"spin"} color={"#000"} />
        </div>
    );
}

export default Loading;