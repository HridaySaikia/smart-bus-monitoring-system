const PARENT_ID_KEY = "smart_bus_parent_id";

export function setStoredParentId(parentId: string) {
  localStorage.setItem(PARENT_ID_KEY, parentId);
}

export function getStoredParentId() {
  return localStorage.getItem(PARENT_ID_KEY);
}

export function clearStoredParentId() {
  localStorage.removeItem(PARENT_ID_KEY);
}