'use client';

import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnitProps {
  value: number;
  unit: string;
}

const Timer: React.FC = () => {
  const targetDate = new Date('2024-10-31T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = targetDate - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <div className="flex space-x-4">
          <TimeUnit value={timeLeft.days} unit="Days" />
          <TimeUnit value={timeLeft.hours} unit="Hours" />
          <TimeUnit value={timeLeft.minutes} unit="Minutes" />
          <TimeUnit value={timeLeft.seconds} unit="Seconds" />
        </div>
      </div>
    </div>
  );
};

const TimeUnit: React.FC<TimeUnitProps> = ({ value, unit }) => (
  <div className="flex flex-col items-center">
    <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 shadow-lg">
      {value.toString().padStart(2, '0')}
    </div>
    <div className="text-xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500">
      {unit}
    </div>
  </div>
);

export default Timer;