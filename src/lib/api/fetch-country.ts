import { ICountry } from '@/lib/schema';

import { api } from './api';

interface IData {
  countries: ICountry[];
  total: number;
}

interface ICountrySearchResponse {
  data: IData;
}

export async function fetchCountry(searchParams: string, limit: number, offset: number): Promise<IData> {
  const { data } = await api<ICountrySearchResponse>(
    `/countries?search=${searchParams}&limit=${limit}&offset=${offset}`
  );

  if (!data) {
    throw new Error('Failed to fetch country data');
  }

  return data;
}
