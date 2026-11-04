import { Link } from "react-router";

export default function HomePage() {
  return (
    <main className="app-container">
      <h1>Welcome to Boardly</h1>
      <p>Your workspace for boards and notes.</p>
      <Link to="/boards">Open your boards</Link>
    </main>
  )
}
