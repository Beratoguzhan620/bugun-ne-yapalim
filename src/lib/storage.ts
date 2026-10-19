import AsyncStorage from "@react-native-async-storage/async-storage";

/** Reads a JSON value; anything missing or unreadable falls back to the default. */
export async function load<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export async function save<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Preferences are a convenience; the app keeps working without them.
  }
}
