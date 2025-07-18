import { useState } from 'react';
import axios from 'axios';
const Form = ({ id, onError, setAnswerResult, answerResult }) => {
  const [playerNameInputField, setplayerNameInputField] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (playerNameInputField.length < 1) {
      setAnswerResult(false);
      return;
    }
    let response;
    try {
      setIsLoading(true);
      response = await axios({
        method: 'post',
        url: 'http://localhost:3000/quizzes/' + id + '/answers',
        data: {
          name: playerNameInputField,
        },
      });
      setIsLoading(false);
      setAnswerResult(response.data.correct);
    } catch (e) {
      onError(e.message);
      setIsLoading(false);
      console.log(e.response);
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-8">
        <input
          type="text"
          className={`form-control ${answerResult === false && 'is-invalid'}`}
          id="playerName"
          placeholder="Player Name"
          value={playerNameInputField}
          onChange={(e) => setplayerNameInputField(e.target.value)}
        ></input>
        {answerResult === false && (
          <div className="invalid-feedback">Incorrect answer. Try again!</div>
        )}
      </div>
      <div className="col-4">
        {!isLoading ? (
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button className="btn btn-primary w-100" type="submit" disabled>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span role="status"> Loading...</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
