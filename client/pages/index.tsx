import Image from 'next/image';
import localFont from 'next/font/local';
import { useEffect, useState } from 'react';
import { checkLoginStatus, logout } from '@/api/auth';
import { AUTH_ENDPOINTS } from '@/constants/api';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const data = await checkLoginStatus();
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
          setUserEmail(data.email);
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    };

    fetchLoginStatus();
  }, []);

  const handleLogin = () => {
    window.location.href = AUTH_ENDPOINTS.LOGIN;
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUserEmail('');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Image
          className='dark:invert'
          src='/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />

        <div className='flex flex-col items-center gap-4'>
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className='flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors'
            >
              Sign in with Google
            </button>
          ) : (
            <div className='flex flex-col items-center gap-4'>
              <p className='text-sm'>Logged in as: {userEmail}</p>
              <button
                onClick={handleLogout}
                className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
