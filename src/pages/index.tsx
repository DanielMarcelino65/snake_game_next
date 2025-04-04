import Head from 'next/head'
import HomeScreen from '@/components/screens/Home'
import Login from '@/components/screens/Login';
import { useThemeContext } from '@/context'
import { useAuth } from '@/context/AuthContext';


export default function Home() {

  const {currentUser} = useAuth();
  const {themeLoaded} = useThemeContext();

  return (
    <>
      <Head>
        <title>Snake Game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {
          themeLoaded && currentUser ? <HomeScreen /> : <Login />

        }
    </>
  )
}
