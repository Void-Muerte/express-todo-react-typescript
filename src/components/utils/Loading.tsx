import { useState, useEffect } from "react";

const Loading = () => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === 3 ? 1 : prevDots + 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);
  return <span className="font-black">{".".repeat(dots)}</span>;
};

export default Loading;
