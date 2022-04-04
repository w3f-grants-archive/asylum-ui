import * as React from 'react'
import { GameCard } from '../game-card'

// @TODO Delete this object, after adding normal blockchaine
const games: any = [
  {
    title: 'Fortnite',
    img: ''
  },
  {
    title: 'GTA V',
    img: ''
  },
  {
    title: 'Game a',
    img: ''
  }
]

interface tempObject {
  title: string;
  img: string;
}

interface IProps {}

export const GameTable: React.FC<IProps> = () => {
  return (
    <div className='no-scrollbar flex flex-wrap justify-center pt-[35px] max-h-[70vh] max-w-[80vw] overflow-auto gap-9'>
      {games &&
        games.map((item: tempObject) => {
          return (
            <GameCard key={item.title} title={item.title} img={item.img} />
          )
        })}
    </div>
  )
}
