import { GameBtn } from '@/components/GameBtn.component'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='grid lg:grid-cols-4 grid-cols-1 gap-4'>
        <GameBtn link="chicken" text="雞同鴨講" />
        <GameBtn link="trueordare" text="真心話大冒險" />
      </div>
    </main>
  )
}
