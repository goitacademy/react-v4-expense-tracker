import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { getCurrentUser } from "@/services/users";
import styles from "./UserMenu.module.css";

export async function UserMenu() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className={styles.menu}>
        <Link className="button buttonGhost" href="/login">
          Log in
        </Link>
        <Link className="button buttonPrimary" href="/register">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.menu}>
      <span className={styles.email}>{user.email}</span>
      <form action={logoutAction}>
        <button className="button buttonGhost" type="submit">
          Log out
        </button>
      </form>
    </div>
  );
}
