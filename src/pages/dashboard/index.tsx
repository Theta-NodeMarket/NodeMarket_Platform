import Button from "@mui/material/Button";
import { supabase } from '@/lib/initSupabase'
import { AppProps } from "next/app";
import { GetServerSideProps } from 'next'

type Data = { }

export default function DashboardPage(data: AppProps) {
  return (
  <Button variant="contained">HELLO THERE</Button>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => { 
  const res = await supabase.auth.getUser();
  const data: Data = await res.data;
  console.log(data);

  return {
    props: {
      data,
    },
  }
}