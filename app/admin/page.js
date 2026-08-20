import { verifySession } from "@/lib/dal";
import { getPackageRequests } from "@/lib/db";
import { logout } from "@/app/admin/actions";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const formatRs = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function formatWhen(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  await verifySession();

  let requests = null;
  let loadError = null;
  try {
    requests = await getPackageRequests();
  } catch (err) {
    loadError = err.message;
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div className="admin-login-brand">
          harshit<span className="admin-login-brand-accent">creates</span>
          <span className="admin-login-brand-accent">_</span> admin
        </div>
        <form action={logout}>
          <button type="submit" className="btn-secondary admin-logout-btn">
            Log out
          </button>
        </form>
      </div>

      <h1 className="admin-title">Package requests</h1>

      {loadError ? (
        <p className="admin-empty">
          Couldn&apos;t load requests — {loadError}
        </p>
      ) : requests.length === 0 ? (
        <p className="admin-empty">No package requests yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Package</th>
                <th>Add-ons</th>
                <th>Total</th>
                <th>Requested</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>
                    <a href={`tel:${r.phone}`}>{r.phone}</a>
                  </td>
                  <td>{r.tier_name}</td>
                  <td>{Array.isArray(r.addon_names) && r.addon_names.length ? r.addon_names.join(", ") : "—"}</td>
                  <td>{formatRs(r.total)}</td>
                  <td>{formatWhen(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
