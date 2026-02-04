import React from 'react';

const MovieCardSkeleton = () => {
    return (
      <div className="shrink-0 w-100 animate-pulse">
        <div className="rounded-lg bg-gray-700 w-80 h-100"></div>
      </div>
    );
}

export default MovieCardSkeleton;
