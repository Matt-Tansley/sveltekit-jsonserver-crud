const apiHost = 'http://localhost:3001';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const { id } = params;
    const game = await fetch(`${apiHost}/games/${id}`).then(
        (res) => res.json()
    );

    const playersRes = await fetch(`${apiHost}/players`)
    const players = await playersRes.json()

    return {
        game,
        players
    };
}