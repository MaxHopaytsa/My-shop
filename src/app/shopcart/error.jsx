'use client'
export default function Error({ error, reset }) {
    return (
      <div>
        <h2>Ooops!!! {error.message}</h2>
        <button onClick={() => reset()}>Try again</button>
      </div>
    );
  }