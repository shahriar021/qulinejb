
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type WatchLaterContextType = {
  watchLaterIds: string[];
  toggleWatchLater: (movieId: number | string) => void;
};

const WatchLaterContext = createContext<WatchLaterContextType | undefined>(undefined);

export const WatchLaterProvider = ({ children }: { children: ReactNode }) => {
  const [watchLaterIds, setWatchLaterIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watch_later");
    if (stored) setWatchLaterIds(JSON.parse(stored));
  }, []);

  const toggleWatchLater = (movieId: number | string) => {
    const wId = String(movieId);
    setWatchLaterIds((prev) => {
      const updated = prev.includes(wId) ? prev.filter((id) => id !== wId) : [wId, ...prev];
      localStorage.setItem("watch_later", JSON.stringify(updated));
      return updated;
    });
  };

  return <WatchLaterContext.Provider value={{ watchLaterIds, toggleWatchLater }}>{children}</WatchLaterContext.Provider>;
};

export const useWatchLaterContext = () => {
  const context = useContext(WatchLaterContext);
  if (!context) throw new Error("useWatchLaterContext must be used within WatchLaterProvider");
  return context;
};
