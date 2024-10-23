<script lang="ts">
	import Table from '$lib/components/Table.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let dialog: HTMLDialogElement;
</script>

<header class="container">
	<h1>Terraforming Mars Stats</h1>
	<button on:click={() => dialog.showModal()}>Add</button>
</header>
<main class="container">
	<Table games={data.games} players={data.players} />
</main>

<!-- Add modal -->
<dialog bind:this={dialog}>
	<article>
		<header>
			<h2>Add New Game</h2>
		</header>
		<form method="POST" id="addGameForm">
			<label for="date">Date</label>
			<input type="date" name="date" required />

			<label for="board">Board</label>
			<select name="board" required>
				<option value="Tharsis">Tharsis</option>
				<option value="Hellas">Hellas</option>
			</select>

			<label for="winner">Winner</label>
			<select name="winner" required>
				{#each data.players as player}
					<option value={player.id}>{player.name}</option>
				{/each}
			</select>
		</form>
		<footer>
			<button class="secondary" on:click={() => dialog.close()}>Cancel</button>
			<button form="addGameForm">Confirm</button>
		</footer>
	</article>
</dialog>
