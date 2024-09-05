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

const DashBoard = () => {
  return (
    <main className='container mx-auto min-h-screen w-full bg-muted/40 space-y-5'>
      <h1 className='space-y-2 p-5 text-xl font-medium'> Countries Info</h1>

      <section className='flex justify-between px-4'>
        <section className='flex flex-row gap-4'>
          <Input type='email' placeholder='Country Name' />
          <Select>
            <SelectTrigger className='w-[300px]'>
              <SelectValue placeholder='Population' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value='apple'>Apple</SelectItem>
                <SelectItem value='banana'>Banana</SelectItem>
                <SelectItem value='blueberry'>Blueberry</SelectItem>
                <SelectItem value='grapes'>Grapes</SelectItem>
                <SelectItem value='pineapple'>Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant='link' className='underline'>
            Clear
          </Button>
        </section>

        <Button>Show all Countries</Button>
      </section>

      <TableContainer />
    </main>
  );
};

export default DashBoard;
