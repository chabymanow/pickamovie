"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error loading items</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
