import Head from 'next/head';
import Game from '../components/Game';
import useSWR from 'swr';
import Link from 'next/link';
export default function Home() {
    const { data: games, mutate } = useSWR('/api/games');
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">
                <div className="my-12">
                    <h1 className="text-red-100 text-2xl">
                        Errday Code Games
                    </h1>
                    <p className="text-red-200">
                        Create and browse games you use every day in Web
                        Development!
                    </p>
                    <Link href="/new">
                        <a className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Create a Game!
                        </a>
                    </Link>
                </div>
                {games &&
                    games.map((game) => (
                        <Game
                            key={game.id}
                            game={game}
                            gameDeleted={mutate}
                        />
                    ))}
            </main>
        </div>
    );
}
