import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { TransformedCountry } from '@/lib/types';

export const columns: ColumnDef<TransformedCountry>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Country Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'abbreviation',
    header: 'Code',
  },
  {
    accessorKey: 'capital',
    header: 'Capital',
  },
  {
    accessorKey: 'phone',
    header: 'Ph Code',
  },
  {
    accessorKey: 'population',
    header: 'Population',
    cell: ({ row }) => {
      const number = row.getValue('population');
      if (number) {
        const formattedNumber = new Intl.NumberFormat().format(number as number);
        return <span> {formattedNumber}</span>;
      }

      return <div> {'-'}</div>;
    },
  },
  {
    accessorKey: 'flag',
    header: 'Flag',
    cell: ({ row }) => {
      const imgURL = row.getValue('flag') as string;
      if (imgURL) {
        return (
          <div>
            <img src={imgURL} width={30} height={30} alt='country-flag' />
          </div>
        );
      }

      return null;
    },
  },
  {
    accessorKey: 'emblem',
    header: 'Emblem',
    cell: ({ row }) => {
      const imgURL = row.getValue('emblem') as string;
      if (imgURL) {
        return (
          <div>
            <img src={imgURL} width={30} height={30} alt='country-emblem' />
          </div>
        );
      }

      return null;
    },
  },
];
