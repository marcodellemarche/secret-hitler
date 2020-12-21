import Head from 'next/head';
import GameForm from '../components/GameForm';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next Game</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w-lg mx-auto">
                <h1 className="text-red-100 text-2xl mb-4">New Game</h1>
                <GameForm />
            </main>
        </div>
    );
}
