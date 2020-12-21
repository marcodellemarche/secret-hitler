import React from 'react';
// import Code from './Code';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Game({ game, gameDeleted }) {
    const router = useRouter();

    const deleteGame = async () => {
        try {
            await fetch('/api/deleteGame', {
                method: 'DELETE',
                body: JSON.stringify({ id: game.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            gameDeleted();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="bg-gray-100 p-4 rounded-md my-2 shadow-lg">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl text-gray-800 font-bold">
                    {game.data.name}
                </h2>
                <span className="font-bold text-xs text-red-800 px-2 py-1 rounded-lg ">
                    {game.data.size} players
                </span>
            </div>
            {/* <p className="text-gray-900 mb-4">{game.data.description}</p> */}
            {/* <Code code={game.data.code} /> */}
            <Link href={`/edit/${game.id}`}>
                <a className="text-gray-800 mr-2">Edit</a>
            </Link>
            <button onClick={deleteGame} className="text-gray-800 mr-2">
                Delete
            </button>
        </div>
    );
}
