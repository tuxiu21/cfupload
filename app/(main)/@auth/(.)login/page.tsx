import Login from "@/components/login";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div>
      <dialog className="modal modal-open">
        <div className="modal-box">
          <form method="dialog">
            <Link
              href="/files"
              className="btn btn-sm btn-ghost  btn-square absolute right-2 top-2"
            >
              ✕
            </Link>
          </form>
          <Login inDialog />
        </div>
      </dialog>
    </div>
  );
}
