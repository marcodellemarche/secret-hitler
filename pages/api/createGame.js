import { createGame } from '../../utils/Fauna';

const cardsDeck = {
    '5': [12, 24],
    '6': [12, 24],
    '7': [12, 24],
    '8': [12, 24]
};

export default async function handler(req, res) {
    const { name, size, players } = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
    try {
        if (size < 5 || size > 8) {
            return res.status(400).json({ msg: `Number of players not allowed: ${size}` });
        }
        const [l, f] = cardsDeck[size];
        const lawsToDraw = Array.from({length: l + f}, (_, i) => (i < l) ? 'liberal' : 'fascist').sort(() => Math.random() - 0.5);
        const createdGame = await createGame({ 
            name,
            players, 
            size, 
            president: players[0].name,
            chancellor: '',
            step: 'choose',
            votes: [],
            lawsToDraw,
            lawsDrawn: [],
            lawsDiscarded: [],
            fascistLaws: 0,
            liberalLaws: 0
        });
        return res.status(200).json(createdGame);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
    }
}
