import { Poppins } from 'next/font/google'
import './ui/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // Tambahkan properti weight
});


export const metadata = {
  title: 'SIPAKARA WEB',
  description: 'Sistem Informasi Pengelolaan Keuangan Koperasi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
