import { Dashboard } from "../components/Dashboard/Dashboard";
import AdminLogin from "./admin/login/page";

export default function Home() {
  return (
    <main className="mx-auto w-full bg-slate-50">
      <AdminLogin />
    </main>
  );
}
