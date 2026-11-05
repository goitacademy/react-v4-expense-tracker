import Link from "next/link";
import styles from "./NavLink.module.css";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
}
