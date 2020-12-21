import { getGames } from '../../utils/Fauna';
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405);
    }
    try {
        const games = await getGames();
        return res.status(200).json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}
