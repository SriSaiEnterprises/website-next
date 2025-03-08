import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';

const ContactSubmissions = () => {
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['contact_submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact submissions:', error);
        throw error;
      }
      return data || [];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Website</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Message</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.name}</TableCell>
            <TableCell>{submission.email}</TableCell>
            <TableCell>{submission.website}</TableCell>
            <TableCell>{submission.phone}</TableCell>
            <TableCell>{submission.message}</TableCell>
            <TableCell>{new Date(submission.created_at).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactSubmissions; 