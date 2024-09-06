import { MoonLoader } from 'react-spinners';

import DataTable from './DataTable';
import { columns } from './Columns';
import { TransformedCountry } from '@/lib/types';

type TableContainerProps = {
  data: TransformedCountry[];
  isLoading: boolean;
  isPending: boolean;
};

const TableContainer = ({ data, isLoading, isPending }: TableContainerProps) => {
  if (isLoading)
    return (
      <div className='flex justify-center items-center'>
        <MoonLoader size={42} speedMultiplier={1} />
      </div>
    );

  if (isPending) {
    <div>
      <p>Searching...</p>
    </div>;
  }

  return <DataTable columns={columns} data={data || []} />;
};

export default TableContainer;
