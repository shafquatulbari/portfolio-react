"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen grid place-items-center bg-primary text-center p-10">
      <div>
        <h1 className="text-3xl font-bold text-red-400">
          Something went wrong
        </h1>
        <pre className="text-xs text-gray-400 mt-2 max-w-xl overflow-auto">
          {String(error)}
        </pre>
        <button
          onClick={() => reset()}
          className="inline-block mt-6 px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
