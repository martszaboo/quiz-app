import React from 'react';

const SuccessScreen = ({ message = 'Success!', onReset }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <div className="alert alert-success text-center" role="alert">
        <h4 className="alert-heading">{message}</h4>
        <p className="mb-0">Your operation completed successfully.</p>
      </div>
      {onReset && (
        <button className="btn btn-outline-primary mt-3" onClick={onReset}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default SuccessScreen;
