import { ToastContainer } from 'react-toastify';
import { StoreProvider } from '@/store/StoreProvider';

import './../style/index.scss';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <>
      <StoreProvider>
        <html lang="en">
          <head>
            <title>Test Synapsis</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins:wght@300;400;500;600;700;800;900&family=Tektur:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          </head>
          <body>
            {children}
            <ToastContainer />
          </body>
        </html>
      </StoreProvider>
    </>
  )
}
