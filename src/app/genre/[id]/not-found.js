export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Person not found 👤</h1>
      <p className="text-slate-500 mb-6">
        This person profile doesn’t exist or is unavailable.
      </p>
      <a href="/people" className="text-indigo-600 hover:underline">
        Browse people
      </a>
    </div>
  );
}
