
import React, { useState, useEffect } from 'react';

interface Props {
  targetDate: number;
}

const Countdown: React.FC<Props> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-12 bg-black/40 border-y border-gold/10">
      <div className="flex justify-center gap-4 sm:gap-12">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-cinzel text-3xl sm:text-5xl text-gold mb-1">{String(value).padStart(2, '0')}</span>
            <span className="text-[10px] sm:text-xs text-white/40 font-cinzel tracking-widest uppercase">
              {label === 'days' ? 'Días' : label === 'hours' ? 'Horas' : label === 'minutes' ? 'Minutos' : 'Segundos'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Countdown;
