export type UserRole = "admin" | "parent";

const ROLE_KEY = "smart_bus_role";

export function setStoredRole(role: UserRole) {
  if (typeof window !== "undefined") {
    localStorage.setItem(ROLE_KEY, role);
  }
}

export function getStoredRole(): UserRole | null {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem(ROLE_KEY);

  if (role === "admin" || role === "parent") {
    return role;
  }

  return null;
}

export function clearStoredRole() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ROLE_KEY);
  }
}