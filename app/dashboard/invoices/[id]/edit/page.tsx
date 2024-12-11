import Form from '@/app/dashboard/invoices/edit-form';
import Breadcrumbs from '@/app/dashboard/invoices/breadcrumbs';
import { fetchCustomers,fetchInvoiceById } from '@/app/lib/data';
import {notFound} from 'next/navigation'
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const [customers,invoice] = await Promise.all([fetchCustomers(),fetchInvoiceById(id)])
  if(!invoice){
    notFound()
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}