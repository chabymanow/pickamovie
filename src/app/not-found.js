export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Movie not found</h1>
      <p className="text-slate-500 mb-6">
        The movie you’re looking for doesn’t exist or was removed.
      </p>
      <a href="/" className="text-indigo-600 hover:underline">
        Go back home
      </a>
    </div>
  );
}
