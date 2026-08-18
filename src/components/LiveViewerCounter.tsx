import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";

/**
 * Calculates current min and max viewers based on local time and day of week:
 * - 05:00 - 07:45: 23 to 78
 * - 07:46 - 12:00: 42 to 64
 * - 12:01 - 13:30: 142 to 192
 * - 13:31 - 18:00: 49 to 112
 * - 18:01 - 00:23: 98 to 308
 * - 00:24 - 00:49: 12 to 37
 * - 00:50 - 04:59: 10 to 28
 *
 * Doubled on Saturday and Sunday.
 */
function getViewerBounds(now: Date): { min: number; max: number } {
  const day = now.getDay(); // 0 = Sunday, 1-5 = Mon-Fri, 6 = Saturday
  const isWeekend = day === 0 || day === 6;
  const multiplier = isWeekend ? 2 : 1;

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  let baseMin = 20;
  let baseMax = 50;

  if (timeInMinutes >= 5 * 60 && timeInMinutes <= 7 * 60 + 45) {
    // 05:00 to 07:45
    baseMin = 23;
    baseMax = 78;
  } else if (timeInMinutes >= 7 * 60 + 46 && timeInMinutes <= 12 * 60) {
    // 07:46 to 12:00
    baseMin = 42;
    baseMax = 64;
  } else if (timeInMinutes >= 12 * 60 + 1 && timeInMinutes <= 13 * 60 + 30) {
    // 12:01 to 13:30
    baseMin = 142;
    baseMax = 192;
  } else if (timeInMinutes >= 13 * 60 + 31 && timeInMinutes <= 18 * 60) {
    // 13:31 to 18:00
    baseMin = 49;
    baseMax = 112;
  } else if (timeInMinutes >= 18 * 60 + 1 || timeInMinutes <= 23) {
    // 18:01 to 00:23
    baseMin = 98;
    baseMax = 308;
  } else if (timeInMinutes >= 24 && timeInMinutes <= 49) {
    // 00:24 to 00:49
    baseMin = 12;
    baseMax = 37;
  } else {
    // 00:50 to 04:59 (late night/early morning)
    baseMin = 10;
    baseMax = 28;
  }

  return {
    min: baseMin * multiplier,
    max: baseMax * multiplier,
  };
}

export default function LiveViewerCounter() {
  const [viewers, setViewers] = useState<number>(() => {
    const { min, max } = getViewerBounds(new Date());
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  useEffect(() => {
    const updateCounter = () => {
      const { min, max } = getViewerBounds(new Date());
      // Pick a wide random value within the current time schedule's min and max range for dramatic variation
      const nextViewers = Math.floor(Math.random() * (max - min + 1)) + min;
      setViewers(nextViewers);
    };

    // Run updates every 1.5s to 3s ("poucos segundos") with high oscillation
    let timeoutId: NodeJS.Timeout;
    const scheduleNext = () => {
      const nextDelay = Math.floor(Math.random() * 1500) + 1500; // 1500ms to 3000ms
      timeoutId = setTimeout(() => {
        updateCounter();
        scheduleNext();
      }, nextDelay);
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex items-center justify-center mb-2">
      <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs select-none">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>
          <strong className="font-bold text-zinc-900">{viewers}</strong> pessoas na página agora
        </span>
      </span>
    </div>
  );
}

