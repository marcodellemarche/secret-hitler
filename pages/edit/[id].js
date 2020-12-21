import Head from 'next/head';
import { getGameById } from '../../utils/Fauna';
import GameForm from '../../components/GameForm';

export default function Home({ game }) {
    return (
        <div>
            <Head>
                <title>Update Next Game</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w-lg mx-auto">
                <h1 className="text-red-100 text-2xl mb-4">Update Game</h1>
                <GameForm game={game} />
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const id = context.params.id;
        const game = await getGameById(id);
        return {
            props: { game },
        };
    } catch (error) {
        console.error(error);
        context.res.statusCode = 302;
        context.res.setHeader('Location', `/`);
        return { props: {} };
    }
}
