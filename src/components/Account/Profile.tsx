import { Contacts } from './Contacts';
import { AddressData, PersonalData } from './PersonalData';

export default function Profile() {
  return (
    <section className='w-full space-y-6'>
      <PersonalData />
      <Contacts />
      <AddressData />
    </section>
  );
}
