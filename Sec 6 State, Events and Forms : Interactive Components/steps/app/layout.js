import './globals.css';

export const metadata = {
  title: 'Steps App',
  description: 'Learning React with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
