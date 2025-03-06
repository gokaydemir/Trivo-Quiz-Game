import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

const Result = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const score = queryParams.get("score");

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen flex-col  bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-white">Quiz Tamamlandı!</h1>
      <p className="text-xl">Skorun: {score}</p>
      <Button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Tekrar Oyna
      </Button>
    </div>
  );
};

export default Result;
