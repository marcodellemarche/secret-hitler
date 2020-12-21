const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const getGames = async () => {
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('games'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    );
    const games = data.map((game) => {
        game.id = game.ref.id;
        delete game.ref;
        return game;
    });

    return games;
};

const getGameById = async (id) => {
    const game = await faunaClient.query(
        q.Get(q.Ref(q.Collection('games'), id))
    );
    game.id = game.ref.id;
    delete game.ref;
    return game;
};

const createGame = async (gameState) => {
    return await faunaClient.query(
        q.Create(q.Collection('games'), {
            data: gameState,
        })
    );
};

const updateGame = async (gameState) => {
    return await faunaClient.query(
        q.Update(q.Ref(q.Collection('games'), gameState.id), {
            data: gameState,
        })
    );
};

const deleteGame = async (id) => {
    return await faunaClient.query(
        q.Delete(q.Ref(q.Collection('games'), id))
    );
};

module.exports = {
    createGame,
    getGames,
    getGameById,
    updateGame,
    deleteGame,
};
