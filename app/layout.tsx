import './globals.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>TradAura</title>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
