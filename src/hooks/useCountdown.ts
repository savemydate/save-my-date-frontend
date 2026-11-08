"use client";

import { useEffect, useState } from "react";

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEventPassed: boolean;
  isReady: boolean;
}

/**
 * Hook para cuenta regresiva en tiempo real protegida contra fallos de hidratación SSR.
 */
export function useCountdown(targetIsoDate: string): CountdownState {
  const [state, setState] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEventPassed: false,
    isReady: false,
  });

  useEffect(() => {
    const targetTime = new Date(targetIsoDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEventPassed: true,
          isReady: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setState({
        days,
        hours,
        minutes,
        seconds,
        isEventPassed: false,
        isReady: true,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetIsoDate]);

  return state;
}
