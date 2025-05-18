// app/games/[slug]/page.js
import Image from 'next/image';
import { getGameBySlug } from '@/api';
import markdownToHtml from '@/api/markdown';

async function getGame(slug) {
  const game = getGameBySlug(slug);
  const content = await markdownToHtml(game.content || '');
  return {
    ...game,
    content,
  };
}

export default async function GameDetails({ params }) {
  const { slug } = await params;
  const game = await getGame(slug);

  return (
    <div className="container mx-auto px-12 py-10 max-w-7xl space-y-12 text-white">
      <h1 className="text-5xl font-extrabold text-center">{game.title}</h1>

      {/* Cover Image */}
      <div className="relative w-full h-[30rem] shadow-lg rounded-xl overflow-hidden">
        <Image
          className="object-cover w-full h-full"
          src={game.coverImage}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          priority
        />
      </div>

      {/* Description */}
      <p className="text-lg leading-relaxed max-w-6xl mx-auto text-center">{game.description}</p>

      {/* Download Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
        {game.appStoreId && (
          <a
            href={`https://apps.apple.com/app/${game.appStoreId}`}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download on App Store
          </a>
        )}
        {game.playStoreId && (
          <a
            href={`https://apps.apple.com/app/${game.playStoreId}`}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download on Play Store
          </a>
        )}
        {game.itchIoId && (
          <a
            href={`https://jerga99.itch.io/${game.itchIoId}`} // Replace with actual itch.io game link if available
            className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play on Itch.io
          </a>
        )}
      </div>

      {/* Content Section */}
      <section className="space-y-6 max-w-6xl">
        <article
          className="prose prose-invert prose-lg mx-auto w-full max-w-6xl"
          dangerouslySetInnerHTML={{ __html: game.content }}
        />
      </section>

      {/* What You Will Learn */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">What You Will Learn</h2>
        <ul className="list-disc pl-6 space-y-2 mx-auto">
          {game.wsl.map((item, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Requirements */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Requirements</h2>
        <ul className="list-disc pl-6 space-y-2 mx-auto">
          {game.requirements.map((req, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {req}
            </li>
          ))}
        </ul>
      </section>

      {/* Target Group */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Target Group</h2>
        <ul className="list-disc pl-6 space-y-2 mx-auto">
          {game.targetGroup.map((group, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {group}
            </li>
          ))}
        </ul>
      </section>

      {/* Gameplay Video */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Gameplay Video</h2>
        <p>Check out the gameplay video on YouTube:</p>
        <a
          href={game.video}
          className="block text-blue-400 hover:text-blue-200 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch Gameplay Video
        </a>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Support</h2>
        <a href="mailto:jerga99@gmail.com"
          className="block text-blue-400 hover:text-blue-200 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Send Email
        </a>
      </section>
      <section className="space-y-4">
        <a
          href={`/privacy-policy/${game.slug}`}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </section>
      {/* Gallery */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {game.images.map((image, index) => (
            <div key={index} className="relative w-full h-48 shadow-lg rounded-lg overflow-hidden">
              <Image
                className="object-cover"
                src={image}
                alt={`${game.title} Screenshot ${index + 1}`}
                fill
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
