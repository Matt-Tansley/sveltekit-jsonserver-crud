<script>
	// import { goto } from '$app/navigation';

	export let data;

	let game = data.game;
	let players = data.players;

	// const findPlayerName = (id: string) => {
	// 	return players.find((player: any) => player.id === id)?.name;
	// };
</script>

<main class="container">
	<h1>Edit Game</h1>

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
			{#each data.players as player}
				<option value={player.id}>{player.name}</option>
			{/each}
		</select>
	</div>
</main>
