<script lang="ts">
	import { Icon } from 'svelte-awesome';
	import plusCircle from 'svelte-awesome/icons/plusCircle';
	import minusCircle from 'svelte-awesome/icons/minusCircle';
	import edit from 'svelte-awesome/icons/edit';
	import trash from 'svelte-awesome/icons/trash';

	export let games;
	export let players;

	const findPlayerName = (id: string) => {
		return players.find((player: any) => player.id === id)?.name;
	};

	const apiHost = 'http://localhost:3001';

	export async function deleteGame(id: String) {
		const res = await fetch(`${apiHost}/games/${id}`, {
			method: 'DELETE'
		}).then((res) => {
			res.json();
			location.reload();
		});
	}
</script>

<table class="striped">
	<thead>
		<tr>
			<th scope="col">ID</th>
			<th scope="col">Date</th>
			<th scope="col">Board</th>
			<th scope="col">Winner</th>
			<th scope="col">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each games as game}
			<tr>
				<td>{game.id}</td>
				<td>{game.date}</td>
				<td>{game.board}</td>
				<td>{findPlayerName(game.winnerID)}</td>
				<td>
					<div class="flex-grid">
						<a class="custom-button" href={`/editgame/${game.id}`}><Icon data={edit} scale={2} /></a
						>
						<a class="custom-button" href="/" on:click={() => deleteGame(game.id)}>
							<Icon data={trash} scale={2} />
						</a>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.flex-grid {
		display: flex;
		gap: 20%;
	}

	.custom-button {
		cursor: pointer;
		/* Manually setting here since the value of --pico-color gets overriden for a tags */
		color: #c2c7d0;
	}

	.custom-button:hover {
		color: var(--pico-primary);
	}
</style>
