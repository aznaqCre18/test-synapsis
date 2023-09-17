import { StoreProvider } from '@/store/StoreProvider';
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';

import './../style/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <>
      <StoreProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <ToastContainer />
          </body>
        </html>
      </StoreProvider>
    </>
  )
}
