import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <div className="admin-shell admin-shell-centered">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          harshit<span className="admin-login-brand-accent">creates</span>
          <span className="admin-login-brand-accent">_</span> admin
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
