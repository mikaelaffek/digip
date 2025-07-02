import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect from the root page to the trademark page
  redirect('/trademark');
}
