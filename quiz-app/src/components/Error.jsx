const Error = ({ message }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div className="alert alert-danger text-center " role="alert">
        {message || 'An unexpected error occurred.'}
      </div>
    </div>
  );
};

export default Error;
