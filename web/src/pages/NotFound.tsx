import { Link } from "react-router-dom";

/** Fallback for unknown routes. */
export function NotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-xl font-bold text-brand-600 mb-3">Page not found</h2>
      <p className="text-[15px] text-[#555] mb-6">
        That page does not exist. Try the latest newsletter or the AAOIFI standards.
      </p>
      <Link to="/newsletters.html" className="text-brand-600 underline">
        Daily Newsletters
      </Link>
      {" · "}
      <Link to="/aaoifi/index.html" className="text-brand-600 underline">
        AAOIFI Standards
      </Link>
    </div>
  );
}
