import * as SecureStore from "expo-secure-store";

export async function saveItem(key: string, value: any) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getItem(key: string) {
  const result = await SecureStore.getItemAsync(key);
  return result ? JSON.parse(result) : null;
}

export async function deleteItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}
