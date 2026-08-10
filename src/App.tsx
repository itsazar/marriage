import { useLenis } from './hooks/useLenis'
import { Nav } from './components/Nav'
import { IntroCurtain } from './components/IntroCurtain'
import { ScrollProgress } from './components/ScrollProgress'
import { MusicToggle } from './components/MusicToggle'
import { Hero } from './components/Hero'
import { MeetCouple } from './components/MeetCouple'
import { LoveStory } from './components/LoveStory'
import { Schedule } from './components/Schedule'
import { Traditions } from './components/Traditions'
import { Venue } from './components/Venue'
import { TravelStay } from './components/TravelStay'
import { Playlist } from './components/Playlist'
import { Rsvp } from './components/Rsvp'
import { Footer } from './components/Footer'
import { CursorTrail } from './components/decor/CursorTrail'
import { Fireworks } from './components/decor/Fireworks'
import { AlbumPage } from './components/AlbumPage'
import { AlbumTeaser } from './components/AlbumTeaser'
import { useEffect, useState } from 'react'

export default function App() {
  useLenis()

  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, ''))
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, ''))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === '/album') {
    return <AlbumPage />
  }

  return (
    <>
      <IntroCurtain />
      <Fireworks />
      <ScrollProgress />
      <CursorTrail />
      <Nav />
      <main>
        <Hero />
        <MeetCouple />
        <LoveStory />
        <AlbumTeaser />
        <Schedule />
        <Traditions />
        <Venue />
        <TravelStay />
        <Playlist />
        <Rsvp />
      </main>
      <Footer />
      <MusicToggle />
    </>
  )
}
