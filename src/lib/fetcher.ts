import axios, { AxiosRequestConfig } from 'axios';
import { Country, TransformedCountry } from './types';

const axiosConfig: AxiosRequestConfig = {
  transformResponse: [
    (data: string): TransformedCountry[] => {
      const countries: Country[] = JSON.parse(data);
      return countries.map((country) => ({
        ...country,
        flag: country.media.flag,
        emblem: country.media.emblem,
      }));
    },
  ],
};

export const fetcher = (url: string) =>
  axios.get<TransformedCountry[]>(url, axiosConfig).then((res) => res.data);
