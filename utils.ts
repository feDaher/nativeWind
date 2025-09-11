export function parseNumber(texto: string): number {
  return Number(texto.trim().replace(',', '.'));
}

export function isNumberValid(n: number): boolean {
  return Number.isFinite(n);
}

export function formatNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toString();
}