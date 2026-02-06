import { useEffect, useState } from "react";

export const useWatchLater =()=>{
    const [watchLaterIds, setWatchLaterIds] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("watch_later");
        if (stored) setWatchLaterIds(JSON.parse(stored));
      }, []);

      const toggleWatchLater = (movieId: number | string) => {
        const wId = String(movieId);

        setWatchLaterIds((prev) => {
          let updated;
          if (prev.includes(wId)) {
            // Remove if already exists
            updated = prev.filter((id) => id !== wId);
          } else {
            // Add to front if not exists
            updated = [wId, ...prev];
          }

          localStorage.setItem("watch_later", JSON.stringify(updated));
          return updated;
        });
      };

      return { watchLaterIds, toggleWatchLater };

}