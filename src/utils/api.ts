import type { Internship } from '../types';

const NETWORK_DELAY_MS = 900; // 0.9 second ka delay
const ERROR_RATE = 0.2;       // 20% chance of failure

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchInternships(): Promise<Internship[]> {
  // 1. Artificial network delay
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));

  // 2. Random error simulation
  if (Math.random() < ERROR_RATE) {
    throw new ApiError('Network request failed. Please try again.');
  }

  // 3. Fetch from /public/mock-data.json
  const response = await fetch('/mock-data.json');

  if (!response.ok) {
    throw new ApiError(`Failed to load internships (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new ApiError('Received malformed data from the server.');
  }

  return data as Internship[];
}