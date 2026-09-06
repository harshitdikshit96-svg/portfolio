import { verifySession } from "@/lib/dal";
import { getPackageRequests, getContactRequests } from "@/lib/db";
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

  // Loaded separately so a missing contact_requests table (a database
  // linked before that migration ran) doesn't blank out the package
  // requests above — each section reports its own failure.
  let enquiries = null;
  let enquiryError = null;
  try {
    enquiries = await getContactRequests();
  } catch (err) {
    enquiryError = err.message;
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

      <h1 className="admin-title" style={{ marginTop: 56 }}>
        Contact enquiries
      </h1>

      {enquiryError ? (
        <p className="admin-empty">Couldn&apos;t load enquiries — {enquiryError}</p>
      ) : enquiries.length === 0 ? (
        <p className="admin-empty">No contact enquiries yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Interested in</th>
                <th>Message</th>
                <th>Page</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>
                    <a href={`tel:${r.phone}`}>{r.phone}</a>
                  </td>
                  <td>{r.email ? <a href={`mailto:${r.email}`}>{r.email}</a> : "—"}</td>
                  <td>{r.service}</td>
                  <td style={{ maxWidth: 380, whiteSpace: "pre-wrap" }}>{r.message}</td>
                  <td>{r.source || "—"}</td>
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
