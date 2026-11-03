import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main>
      <div className="h-screen flex-center flex-col gap-y-8 -mt-32">
        <div className="text-center uppercase font-press-start">
          <h1 className="text-6xl mb-8">
            404
          </h1>

          <h2 className="text-4xl">
            Page Not Found
          </h2>
        </div>

        <p className="text-2xl font-medium text-center mb-4">
          The page you are looking for does not exist.
        </p>

        <Link to="/boards" className="button--back font-medium">
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Boards</span>
        </Link>
      </div>
    </main>
  )
}
