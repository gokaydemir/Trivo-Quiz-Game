import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";

const Quiz = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url = `https://opentdb.com/api.php?amount=${queryParams.get(
          "amount"
        )}&category=${queryParams.get("category")}&difficulty=${queryParams.get(
          "difficulty"
        )}`;
        const { data } = await axios.get(url);
        setQuestions(data.results);
      } catch (error) {
        console.error("Veri alınırken hata oluştu", error);
      }
    };

    fetchQuestions();
  }, [location.search]);

  const handleAnswer = (answer: string) => {
    if (answer === questions[index].correct_answer) {
      setScore(score + 1);
    }
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
    } else {
      navigate(`/result?score=${score + 1}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col  bg-gray-900 text-white">
      {questions.length > 0 && questions[index] ? (
        <>
          <h2 className="text-white text-xl font-semibold text-center">
            {questions[index].question}
          </h2>
          {questions[index].incorrect_answers &&
          questions[index].incorrect_answers.length > 0 ? (
            <>
              {questions[index].incorrect_answers.map(
                (ans: string, index: number) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(ans)}
                    className="bg-gray-200 hover:bg-gray-300 p-3 rounded mt-2 w-96"
                  >
                    {ans}
                  </Button>
                )
              )}
              <Button
                onClick={() => handleAnswer(questions[index].correct_answer)}
                className="bg-blue-500 hover:bg-blue-1900 text-white p-2 rounded mt-2 w-96"
              >
                {questions[index].correct_answer}
              </Button>
            </>
          ) : (
            <p>Veri yüklenemedi.</p>
          )}
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
};

export default Quiz;
