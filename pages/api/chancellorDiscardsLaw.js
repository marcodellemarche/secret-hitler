import { updateGame, getGameById } from '../../utils/Fauna';
export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const { id, lawToDiscard, fascistLaws, liberalLaws } = req.body;

    try {
        const { lawsDrawn, lawsDiscarded } = await getGameById(id).data;
        const i = lawsDrawn.indexOf(lawToDiscard);
        if (i === -1) {
            return res.status(400).json({ msg: 'Law was not drawn.' });
        }
        lawsDrawn.splice(i, 1);
        lawsDiscarded.push(lawToDiscard);

        if (lawsDrawn.length !== 1) {
            return res.status(400).json({ msg: `Laws number is not correct: ${lawsDrawn.length}.` });
        }
        const lawToPick = lawsDrawn[0];
        lawsDiscarded.push(lawToPick);
        if (lawToPick === 'fascist') fascistLaws += 1;
        else if (lawToPick === 'liberal') liberalLaws += 1;
        else return res.status(400).json({ msg: `Law is unknown: ${lawToPick}.` });

        const updated = await updateGame({
            id, lawsDrawn: [], lawsDiscarded, step: "action", liberalLaws, fascistLaws
        });
        return res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
    }
}
