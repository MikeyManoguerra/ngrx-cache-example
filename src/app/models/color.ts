export interface Color {
  name: string;
  slug: string;
  value: string;
}

export function initColor() {
  return {
    name: 'Tan',
    slug: 'tan',
    value: 'var(--text-color)',
  }
}

export const EXAMPLE_COLOR_RESPONSE: Color[] = [
  {
    name: 'Purple',
    slug: 'purple',
    value: 'var(--purple)',
  },
  {
    name: 'Green',
    slug: 'green',
    value: 'var(--green)',
  },
  {
    name: 'Yellow',
    slug: 'yellow',
    value: 'var(--yellow)',
  },
  {
    name: 'Tan',
    slug: 'tan',
    value: 'var(--text-color)',
  },
];
