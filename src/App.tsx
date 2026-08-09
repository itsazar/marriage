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
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { CursorTrail } from './components/decor/CursorTrail'
import { Fireworks } from './components/decor/Fireworks'

export default function App() {
  useLenis()

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
        <Schedule />
        <Traditions />
        <Venue />
        <TravelStay />
        <Playlist />
        <Rsvp />
        <Faq />
      </main>
      <Footer />
      <MusicToggle />
    </>
  )
}
