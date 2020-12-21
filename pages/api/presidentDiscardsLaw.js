import { updateGame, getGameById } from '../../utils/Fauna';
export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const { id, lawToDiscard } = req.body;

    try {
        const { lawsDrawn, lawsDiscarded } = await getGameById(id).data;
        const i = lawsDrawn.indexOf(lawToDiscard);
        if (i === -1) {
            return res.status(400).json({ msg: 'Law was not drawn.' });
        }
        lawsDrawn.splice(i, 1);
        lawsDiscarded.push(lawToDiscard);

        const updated = await updateGame({
            id, lawsDrawn, lawsDiscarded, step: "lawChancellor"
        });
        return res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
    }
}
