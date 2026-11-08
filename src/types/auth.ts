/**
 * Tipos y contratos para la autenticación del Panel de Administración (Google SSO)
 */

export type UserRole = "admin" | "superadmin" | "editor";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  provider: "google" | "credentials";
  lastLoginAt?: string;
}

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthSession {
  user: AdminUser | null;
  status: AuthStatus;
  token?: string;
}
