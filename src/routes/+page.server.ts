import type { Actions } from './$types';

const apiHost = 'http://localhost:3001';

export const actions = {
    default: async ({ request }) => {

        const formData = await request.formData();
        console.log(formData)

        addGame(formData)
    }
} satisfies Actions;

async function addGame(formData: FormData) {
    const date = formData.get('date')
    const board = formData.get('board')
    const winnerID = formData.get('winner')

    const newGame = {
        date,
        board,
        winnerID
    }

    const res = await fetch(`${apiHost}/games`, {
        method: 'POST',
        body: JSON.stringify(newGame)
    })

    console.log(res)
}
