import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen text-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-black">404 - Page Not Found</h1>
      <p className="mt-4 text-black">Oops! The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 rounded-lg"
      >
        Go back to Home
      </Link>
    </div>
  );
}
