import { useLenis } from './hooks/useLenis'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { MeetCouple } from './components/MeetCouple'
import { LoveStory } from './components/LoveStory'
import { Schedule } from './components/Schedule'
import { Venue } from './components/Venue'
import { Gallery } from './components/Gallery'
import { Rsvp } from './components/Rsvp'
import { Footer } from './components/Footer'

export default function App() {
  useLenis()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MeetCouple />
        <LoveStory />
        <Schedule />
        <Venue />
        <Gallery />
        <Rsvp />
      </main>
      <Footer />
    </>
  )
}
