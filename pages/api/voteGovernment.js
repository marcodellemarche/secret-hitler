import { updateGame, getGameById } from '../../utils/Fauna';
export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const { id, vote } = req.body;

    try {
        const { votes, size, lawsToDraw } = await getGameById(id).data;
        if (votes.map(v => v.player).includes(vote.player)) {
            return res.status(400).json({ msg: 'Player already voted.' });
        }
        votes.push(vote);

        if (votes.length === size) {
            const win = votes.filter(v => v.value).length > votes.filter(v => !v.value).length;
            if (win) {
                const lawsDrawn = lawsToDraw.splice(0, 3);
                const updated = await updateGame({
                    id, votes: [], step: "lawPresident", lawsDrawn, lawsToDraw
                });
                return res.status(200).json(updated);
            } else {
                const updated = await updateGame({
                    id, votes: [], step: "choose"
                });
                return res.status(200).json(updated);
            }
        } else if (votes.length < size) {
            const updated = await updateGame({
                id, votes
            });
            return res.status(200).json(updated);
        }

        const updated = await updateGame({
            id, votes: []
        });
        return res.status(400).json({ msg: 'Too many votes.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
    }
}
