import React from 'react';

const MovieCardSkeleton = () => {
    return (
      <div className="shrink-0 w-100 animate-pulse">
        <div className="rounded-lg bg-gray-700 w-80 h-100"></div>
        <div className="h-6 bg-gray-700 rounded mt-2 mb-2 w-60"></div>
      </div>
    );
}

export default MovieCardSkeleton;
