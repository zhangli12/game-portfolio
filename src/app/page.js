// app/page.js
import Image from 'next/image';
import { getAllGames } from '@/api';

export default async function Home() {
  const games = getAllGames();

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-8">
      {games.map((game) => (
        <div key={game.id} className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="relative w-full h-64">
            <Image
              className="object-cover w-full h-full"
              src={game.coverImage}
              alt={game.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{game.title}</h2>
            <p className="text-gray-400 text-base">{game.description.slice(0, 100)}...</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <a
              href={`/games/${game.slug}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              See Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
