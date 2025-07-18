import { useEffect, useState } from 'react';
import CareerStats from './components/CareerStats';
import Form from './components/Form';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import axios from 'axios';
import Loader from './components/Loader';
import Error from './components/Error';
import SuccessScreen from './components/SuccessScreen';

const App = () => {
  const [careerData, setCareerData] = useState(null);
  const [error, setError] = useState('');
  const [answerResult, setAnswerResult] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/quizzes/random',
      });
      setCareerData(response.data);
    } catch (e) {
      setError(e.message);
    }
  };
  const onReset = () => {
    setAnswerResult(null);
    setError('');
    setCareerData(null);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  let content;
  console.log(answerResult);

  if (error) {
    content = <Error />;
  } else if (!careerData) {
    content = <Loader />;
  } else if (answerResult) {
    content = <SuccessScreen onReset={onReset} />;
  } else {
    content = (
      <>
        <Header />
        <CareerStats careerStats={careerData.careerStats} />
        <Form
          id={careerData.id}
          onError={setError}
          setAnswerResult={setAnswerResult}
          answerResult={answerResult}
        />
      </>
    );
  }
  return <MainPage>{content}</MainPage>;
};

export default App;
