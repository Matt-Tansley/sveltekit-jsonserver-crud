const apiHost = 'http://localhost:3001';

type Player = {
    id: string
    name: string
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {

    const gamesRes = await fetch(`${apiHost}/games`)
    const games = await gamesRes.json()

    const playersRes = await fetch(`${apiHost}/players`)
    const players = await playersRes.json()



    return {
        games, players
    };
}