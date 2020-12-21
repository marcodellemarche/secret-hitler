import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function GameForm({ game }) {
    const { register, handleSubmit, errors, reset, control } = useForm({
        defaultValues: {
            name: game ? game.data.name : '',
            players: game ? game.data.players : [],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "players"
    });
    const router = useRouter();

    const createGame = async (data) => {
        const { name, players } = data;
        try {
            await fetch('/api/createGame', {
                method: 'POST',
                body: JSON.stringify({ name, players, size: players.length }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    const updateGame = async (data) => {
        const { name, players } = data;
        const id = game.id;
        try {
            await fetch('/api/updateGame', {
                method: 'PUT',
                body: JSON.stringify({ name, players, size: players.length, id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <form onSubmit={handleSubmit(game ? updateGame : createGame)}>
            <div className="mb-4">
                <label
                    className="block text-red-100 text-sm font-bold mb-1"
                    htmlFor="name"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
                    ref={register({ required: true })}
                />
                {errors.name && (
                    <p className="font-bold text-red-900">Name is required</p>
                )}
            </div>
            {/* <div className="mb-4">
                <label
                    className="block text-red-100 text-sm font-bold mb-1"
                    htmlFor="size"
                >
                    Size
                </label>
                <select
                    id="size"
                    name="size"
                    className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
                    ref={register({ required: true })}
                >
                    <option className="py-1">5</option>
                    <option className="py-1">6</option>
                    <option className="py-1">7</option>
                    <option className="py-1">8</option>
                </select>
                {errors.size && (
                    <p className="font-bold text-red-900">
                        Size is required
                    </p>
                )}
            </div> */}

            {fields.map((item, index) => (
                <div className="mb-4" key={index}>
                    <label
                        className="block text-red-100 text-sm font-bold mb-1"
                        htmlFor={`players[${index}].name`}
                    >
                        Player {index + 1}
                    </label>
                    <input
                        type="text"
                        id={`players[${index}].name`}
                        name={`players[${index}].name`}
                        className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
                        ref={register({ required: true })}
                        defaultValue={item.name}
                    />
                    {errors.players && errors.players[index] && errors.players[index].name && (
                        <p className="font-bold text-red-900">Player {index + 1} is required</p>
                    )}
                    <button 
                        className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        type="button" 
                        onClick={() => remove(index)}
                    >
                        Delete
                    </button>
                </div>
            ))}

            <button
                className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                type="button"
                onClick={() => append({name: ''})}
            >
                append
            </button>

            {/* <div className="mb-4">
                <label
                    className="block text-red-100 text-sm font-bold mb-1"
                    htmlFor="description"
                >
                    Player
                </label>
                <textarea
                    name="description"
                    id="description"
                    rows="3"
                    className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="What does the game do?"
                    ref={register({ required: true })}
                ></textarea>
                {errors.description && (
                    <p className="font-bold text-red-900">
                        Player is required.
                    </p>
                )}
            </div> */}
            <button
                className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                type="submit"
            >
                Save
            </button>
            <Link href="/">
                <a className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Cancel
                </a>
            </Link>
        </form>
    );
}
