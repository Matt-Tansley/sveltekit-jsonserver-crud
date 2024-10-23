<script>
	import { goto } from '$app/navigation';

	export let data;

	const apiHost = 'http://localhost:3001';

	let game = data.game;
	let players = data.players;

	async function editGame() {
		const res = await fetch(`${apiHost}/games/${game.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(game)
		}).then((res) => {
			res.json();
			goto('/');
		});
	}
</script>

<main class="container">
	<h1>Edit Game</h1>

	<button on:click={() => goto('/')}>Cancel</button>

	<div>
		<label for="date">Date</label>
		<input type="date" id="date" bind:value={game.date} />
	</div>

	<div>
		<label for="board">Board</label>
		<input type="text" id="board" bind:value={game.board} />
	</div>

	<div>
		<label for="winner">Winner</label>
		<select id="winner" bind:value={game.winnerID}>
			{#each players as player}
				<option value={player.id}>{player.name}</option>
			{/each}
		</select>
	</div>
	<footer>
		<button type="submit" on:click={editGame}>Edit</button>
	</footer>
</main>
