import React, { useEffect, useState } from "react";

interface Props {
  time: number; // time in seconds
  onComplete?: () => void; // optional callback when time ends
}

const CountDownTimer = ({ time, onComplete }: Props) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (seconds <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  // convert seconds → mm:ss
  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute z-999 right-4 top-4 text-white text-3xl sm:text-4xl font-bold backdrop-blur-sm bg-orange-800/5 border border-amber-600 px-4 py-2 rounded-lg">
      {formatTime(seconds)}
    </div>
  );
};

export default CountDownTimer;
