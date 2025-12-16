import Hero from '@/components/Hero'
import Header from '@/components/Header'
import AgendaTimeline from '@/components/AgendaTimeline'
import QuizSection from '@/components/QuizSection'
import FeedbackSection from '@/components/FeedbackSection'
import Footer from '@/components/Footer'
import AsteroidDivider from '@/components/AsteroidDivider'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AsteroidDivider />
      <AgendaTimeline />
      <AsteroidDivider />
      <QuizSection />
      <AsteroidDivider />
      <FeedbackSection />
      <Footer />
    </>
  )
}
