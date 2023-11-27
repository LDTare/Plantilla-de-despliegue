

import Navbar from './components/NavBar'

import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './context/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EMMQ Trámites',
  description: 'Aplicación de gestión de tramites para EMMQ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
      <body className={inter.className}>
        <Navbar/>
        {children}
        </body>
        </Provider>
    </html>
  )
}
