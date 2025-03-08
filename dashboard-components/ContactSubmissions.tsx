import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';

// Define the Submission interface to match your Supabase table
interface Submission {
  id: number;
  name: string;
  email: string;
  website: string | null; // Adjust based on your schema
  phone: string | null; // Adjust based on your schema
  message: string;
  created_at: string | null; // Reflects Supabase nullable timestamp
}

const ContactSubmissions = () => {
  const { data: submissions = [], isLoading } = useQuery<Submission[]>({
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
            <TableCell>{submission.website || 'N/A'}</TableCell>
            <TableCell>{submission.phone || 'N/A'}</TableCell>
            <TableCell>{submission.message}</TableCell>
            <TableCell>
              {submission.created_at
                ? new Date(submission.created_at).toLocaleString()
                : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactSubmissions;