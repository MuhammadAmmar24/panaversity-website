import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-1">
      <h1 className="text-4xl font-bold text-black">404 - Page Not Found</h1>
      <p className="mt-4 text-black">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-white text-bold text-black border border-accent hover:text-white rounded-lg hover:bg-accent"
      >
        Go back to Home
      </Link>
    </div>
  );
}
