import { vi } from 'vitest';

// Example: Mock some global behavior (if needed)
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
});