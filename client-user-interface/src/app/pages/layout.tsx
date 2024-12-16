import { Navbar } from '../components/Navbar';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body >
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
