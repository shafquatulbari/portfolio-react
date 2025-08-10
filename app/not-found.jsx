export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-primary text-center p-10">
      <div>
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p className="text-gray-400 mt-2">
          The page you're looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-500"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
