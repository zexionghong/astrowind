import type { ApiResponse, FriendLinksData } from '~/types/api';

const API_BASE_URL = 'https://api.ipflex.ink/api';

export async function getFriendLinks(): Promise<FriendLinksData> {
  const response = await fetch(`${API_BASE_URL}/links`);
  if (!response.ok) {
    throw new Error('Failed to fetch friend links');
  }
  const data: ApiResponse<FriendLinksData> = await response.json();
  return data.data;
} 