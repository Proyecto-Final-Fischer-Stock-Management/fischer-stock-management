export type RepositorCheckIn = {
  date: string;
  time: string;
  chain: string;
  branch: string;
  sector: string;
};

const CHECK_IN_STORAGE_KEY = "fischer-repositor-check-in";

export function loadLastCheckIn(): RepositorCheckIn | null {
  const storedCheckIn = window.localStorage.getItem(CHECK_IN_STORAGE_KEY);

  if (!storedCheckIn) {
    return null;
  }

  try {
    return JSON.parse(storedCheckIn) as RepositorCheckIn;
  } catch {
    return null;
  }
}

export function saveLastCheckIn(checkIn: RepositorCheckIn) {
  window.localStorage.setItem(CHECK_IN_STORAGE_KEY, JSON.stringify(checkIn));
}

export function clearLastCheckIn() {
  window.localStorage.removeItem(CHECK_IN_STORAGE_KEY);
}
