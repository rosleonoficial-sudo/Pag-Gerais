import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UserPlus } from "lucide-react";
import { NAMES_LIST } from "../data/names";

const STORAGE_KEY_ORDER = "gn_shuffled_order_v2";
const STORAGE_KEY_INDEX = "gn_current_index_v2";

export default function GroupNotification() {
  const [index, setIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  // Generate a random shuffled deck of indices so names are non-sequential and non-repeating until list finishes
  const getShuffledArray = (length: number) => {
    const arr = Array.from({ length }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const saveStateToStorage = (order: number[], idx: number) => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(order));
      localStorage.setItem(STORAGE_KEY_INDEX, idx.toString());
    } catch {
      // Storage unavailable or disabled
    }
  };

  useEffect(() => {
    let initialOrder: number[] = [];
    let initialIndex = 0;

    try {
      const savedOrder = localStorage.getItem(STORAGE_KEY_ORDER);
      const savedIndex = localStorage.getItem(STORAGE_KEY_INDEX);

      if (savedOrder && savedIndex !== null) {
        const parsedOrder = JSON.parse(savedOrder);
        const parsedIdx = parseInt(savedIndex, 10);

        if (
          Array.isArray(parsedOrder) &&
          parsedOrder.length === NAMES_LIST.length &&
          !isNaN(parsedIdx) &&
          parsedIdx >= 0 &&
          parsedIdx < NAMES_LIST.length
        ) {
          initialOrder = parsedOrder;
          initialIndex = parsedIdx;
        }
      }
    } catch {
      // Ignore reading errors
    }

    if (initialOrder.length === 0) {
      initialOrder = getShuffledArray(NAMES_LIST.length);
      initialIndex = 0;
      saveStateToStorage(initialOrder, initialIndex);
    }

    setShuffledIndices(initialOrder);
    setIndex(initialIndex);

    let displayTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;
    let isCancelled = false;

    const runCycle = (currentOrder: number[], currentIndex: number) => {
      if (isCancelled) return;

      // 1. Show notification for currentIndex
      setVisible(true);

      // Advance next state immediately so page refresh/reopen won't repeat current name
      let nextIndex = currentIndex + 1;
      let nextOrder = currentOrder;

      if (nextIndex >= currentOrder.length) {
        nextOrder = getShuffledArray(NAMES_LIST.length);
        nextIndex = 0;
      }

      saveStateToStorage(nextOrder, nextIndex);

      // 2. Hide after 3.2 seconds display time
      displayTimeout = setTimeout(() => {
        if (isCancelled) return;
        setVisible(false);

        // 3. Pause for a random interval between 12 and 20 seconds (12000ms - 20000ms)
        const pauseDelay = Math.floor(Math.random() * 8000) + 12000;

        pauseTimeout = setTimeout(() => {
          if (isCancelled) return;

          setShuffledIndices(nextOrder);
          setIndex(nextIndex);
          runCycle(nextOrder, nextIndex);
        }, pauseDelay);
      }, 3200);
    };

    // Start initial notification after 1.5s on page load
    const startTimeout = setTimeout(() => {
      runCycle(initialOrder, initialIndex);
    }, 1500);

    return () => {
      isCancelled = true;
      clearTimeout(startTimeout);
      clearTimeout(displayTimeout);
      clearTimeout(pauseTimeout);
    };
  }, []);

  const actualNameIndex = shuffledIndices[index] ?? 0;
  const currentName = NAMES_LIST[actualNameIndex] || NAMES_LIST[0];

  return (
    <div className="fixed bottom-4 left-4 z-40 pointer-events-none select-none max-w-[280px] sm:max-w-xs">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={`${actualNameIndex}-${currentName}`}
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-2.5 bg-zinc-900/95 text-white px-3.5 py-2.5 rounded-xl border border-emerald-500/30 shadow-lg backdrop-blur-md text-xs sm:text-sm font-medium"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/40">
              <UserPlus className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col leading-tight overflow-hidden">
              <span className="font-bold text-zinc-100 truncate">
                {currentName}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                entrou no grupo!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
