// Admin email list — checked client-side (UX) AND server-side (Firestore rules)
// To add more admins, include their emails here (comma-separated in env var)
const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || 'daianefeliciano.df@gmail.com';
export const ADMIN_EMAILS = raw.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
