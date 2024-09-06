import { ChangeEvent, useEffect, useState, useTransition } from 'react';
import useSWR from 'swr';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TableContainer from './TableContainer';

import { fetcher } from '@/lib/fetcher';
import { FETCH_COUNTRIES_DETAILS_URL, FETCH_SHOW_ALL_COUNTRIES_URL } from '@/lib/constant';

import { TransformedCountry } from '@/lib/types';

const DashBoard = () => {
  const { data, error, isLoading } = useSWR(FETCH_COUNTRIES_DETAILS_URL, fetcher, {
    revalidateOnFocus: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const [filteredData, setFilteredData] = useState<TransformedCountry[]>([]);
  const [populationFilter, setPopulationFilter] = useState('');

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setSearchTerm(value);

    startTransition(() => {
      if (value === '') {
        setFilteredData(data ?? []);
      } else {
        setFilteredData(
          data?.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())) ?? []
        );
      }
    });
  };

  const handleShowAllCountries = () => {
    fetcher(FETCH_SHOW_ALL_COUNTRIES_URL);
  };

  const handlePopulationFilter = (value: string) => {
    setPopulationFilter(value);
    startTransition(() => {
      setFilteredData(data?.filter((item) => item.population < Number(value)) ?? []);
    });
  };

  useEffect(() => {
    if (data) setFilteredData(data);
  }, [data]);

  return (
    <>
      <main className='container mx-auto min-h-screen w-full bg-muted/40 space-y-5'>
        <h1 className='space-y-2 p-5 text-xl font-medium'> Countries Info</h1>

        <section className='flex justify-between px-4'>
          <section className='flex flex-row gap-4'>
            <Input
              type='email'
              placeholder='Country Name'
              onChange={handleChange}
              value={searchTerm}
            />
            <Select onValueChange={handlePopulationFilter} value={populationFilter}>
              <SelectTrigger className='w-[300px]'>
                <SelectValue placeholder='Population' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Population</SelectLabel>
                  <SelectItem value='1000000'>{'< 1M'} </SelectItem>
                  <SelectItem value='5000000'>{'< 5M'}</SelectItem>
                  <SelectItem value='10000000'>{'< 10M'}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              variant='link'
              className='underline text-violet-800'
              onClick={() => {
                setSearchTerm('');
                setPopulationFilter('');
                setFilteredData(data ?? []);
              }}>
              Clear
            </Button>
          </section>
          <Button onClick={handleShowAllCountries} className='bg-violet-500'>
            Show all Countries
          </Button>
        </section>

        <TableContainer data={filteredData} isLoading={isLoading} isPending={isPending} />
      </main>

      {error && toast.error('something went wrong')}
    </>
  );
};

export default DashBoard;
