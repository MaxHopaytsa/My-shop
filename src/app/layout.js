import Footer from './components/Footer'
import Header from './components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/Redux/provider'
const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'My shop',
  description: 'My shop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`flex flex-col h-full ${inter.className}`}>
        <Providers>
        <Header/>
        <main className='container flex-grow'>{children}
        <div id='portal-root'></div>
        </main>
        <Footer className="mt-auto"/>
        </Providers>
      </body>
    </html>
  )
}
