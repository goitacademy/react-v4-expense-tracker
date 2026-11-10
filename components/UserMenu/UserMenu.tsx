import Link from "next/link";
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
    </div>
  );
}
