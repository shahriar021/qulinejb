// // src/context/WatchLaterContext.tsx
// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";

// type WatchLaterContextType = {
//   watchLaterIds: string[];
//   toggleWatchLater: (movieId: number | string) => void;
// };

// const WatchLaterContext = createContext<WatchLaterContextType>({
//   watchLaterIds: [],
//   toggleWatchLater: () => {},
// });

// export const WatchLaterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [watchLaterIds, setWatchLaterIds] = useState<string[]>([]);

//   useEffect(() => {
//     const stored = localStorage.getItem("watch_later");
//     if (stored) setWatchLaterIds(JSON.parse(stored));
//   }, []);

//   const toggleWatchLater = (movieId: number | string) => {
//     const wId = String(movieId);

//     setWatchLaterIds((prev) => {
//       let updated;
//       if (prev.includes(wId)) {
//         updated = prev.filter((id) => id !== wId);
//       } else {
//         updated = [wId, ...prev];
//       }

//       localStorage.setItem("watch_later", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   return <WatchLaterContext.Provider value={{ watchLaterIds, toggleWatchLater }}>{children}</WatchLaterContext.Provider>;
// };

// export const useWatchLater = () => useContext(WatchLaterContext);



"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type WatchLaterContextType = {
  watchLaterIds: string[];
  toggleWatchLater: (movieId: number | string) => void;
};

const WatchLaterContext = createContext<WatchLaterContextType | undefined>(undefined);

export const WatchLaterProvider = ({ children }: { children: ReactNode }) => {
  const [watchLaterIds, setWatchLaterIds] = useState<string[]>([]);

  // load from localStorage once
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

// Hook to use context
export const useWatchLaterContext = () => {
  const context = useContext(WatchLaterContext);
  if (!context) throw new Error("useWatchLaterContext must be used within WatchLaterProvider");
  return context;
};
