import { updateGame } from '../../utils/Fauna';
export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const { id, chancellor } = req.body;

    try {
        const updated = await updateGame({
            id, chancellor, step: "vote"
        });
        return res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
    }
}
