import { useState } from "react";
import { Select, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Home = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    amount: 10,
    category: "9",
    difficulty: "easy",
  });

  const handleAmountChange = (value: number) => {
    setSettings({ ...settings, amount: value });
  };

  const handleCategoryChange = (value: string) => {
    setSettings({ ...settings, category: value });
  };

  const handleDifficultyChange = (value: string) => {
    setSettings({ ...settings, difficulty: value });
  };

  const handleStart = () => {
    navigate(`/quiz?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <Card className="p-6 w-96 shadow-lg bg-gray-800 text-center relative">
        <h1 className="text-3xl font-bold mb-6">Bilgi Yarışması</h1>
        <div className="space-y-4">
          <Input
            type="number"
            value={settings.amount}
            min="5"
            max="20"
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-white text-center"
            placeholder="Soru Sayısı"
          />
          <Select
            value={settings.category}
            onChange={handleCategoryChange}
            className="w-full bg-gray-700 border-gray-600 text-white"
            dropdownClassName="custom-dropdown"
            popupClassName="custom-popup"
          >
            <Option value="9">Genel Kültür</Option>
            <Option value="18">Bilgisayar Bilimi</Option>
            <Option value="21">Spor</Option>
          </Select>
          <Select
            value={settings.difficulty}
            onChange={handleDifficultyChange}
            className="w-full bg-gray-700 border-gray-600 text-white"
            dropdownClassName="custom-dropdown"
            popupClassName="custom-popup"
          >
            <Option value="easy">Kolay</Option>
            <Option value="medium">Orta</Option>
            <Option value="hard">Zor</Option>
          </Select>
          <Button 
            onClick={handleStart} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Başla
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
