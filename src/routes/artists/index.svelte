<script context="module">
	// Imports from artsists.tsv file
	export async function preload({ params }) {
		const artistsRows = await this.fetch("artists.tsv").then(d => d.text());
		const tags = await this.fetch("/artists/tags.json").then(d => d.json());

		return { artistsRows, tags };
	}
</script>

<script>
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import { tsvParse } from "d3-dsv";
	import { slugify } from "../../js/helpers.js";

	export let artistsRows;
	export let tags;

	// creates a variable artists from the tsv and sorts by name
	$: artists = tsvParse(artistsRows).sort((a, b) =>
		a.name.localeCompare(b.name, "en", { sensitivity: "base" })
		);

	let sortOptions = [
	{
		title: "Artist",
		fn: (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })
	},
	{
		title: "Artwork",
		fn: (a, b) =>
		a.title.localeCompare(b.title, "en", { sensitivity: "base" })
	},
	{
		title: "Years",
		fn: (a, b) =>
		a.years.localeCompare(b.years, "en", { sensitivity: "base" })
	}
	];
	$: sortBy = sortOptions[0];
	let theme = null;
	let media = null;
	let year = null;

	$: artistsFiltered = artists
	.filter(d => {
		return (
			(!media || (d.media && d.media.includes(media))) &&
			(!theme || (d.themes && d.themes.includes(theme))) &&
			(!year || (d.years && d.years.includes(year)))
			);
	})
	.sort(sortBy.fn);
</script>

<style>
	/*the div all the artsts content sits in*/
	.bio-boxes {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 15px;
	}
	/*individual artist cards*/
	.bio-box {
		display: inline-block;
		margin: 16px;
		text-align: left;
		border-color: white;
		border-style: solid;
		border-width: 2px;
		width: 190px;
	}

	.bio-box:hover{
		box-shadow: 5px 5px #ffffa1;
	}

	.artists-container {
		min-height: 80vh;
	}
	.bio-photo-container{
		position: relative;
  		top: 0;
  		left: 0;
	}
	.bio-photo-BG {
		position: relative;
		width: 100%;
		height: 190px;
		top: 0;
  		left: 0;
  		background-image:linear-gradient(grey , #ffffa1);
		background-position: center;
		background-size: cover;
	}
	.bio-photo {
		position: absolute;
		top: 0;
  		left: 0;
		width: 100%;
		height: 190px;
		background-position: center;
		background-size: cover;
	}
	/*text for artists*/
	.bio-box p {
		padding: 0em 0.5em;
		margin-bottom: 1em;
		color: #C0C0C0 !important;
		line-height: 1.3em;
	}
	.bio-box h6 {
		padding: 0.5em 0.5em 0em 0.5em;
		margin-bottom: 0px;
		color: white !important;
	}

	.selectors{
		text-align: left;
	}

	.selectors select {
		font-family: 'Montserrat', sans-serif;
		color: white;
		border-radius: 0px;
		background: transparent;
		display: inline-block;
		border-color: white;
		-webkit-appearance: none;
		padding: 10px;
		font-size: 16px;
		margin-right: 10px;
		width: 25%;
		height: 40px;
	}

	@media screen and (max-width: 768px) {
		.bio-boxes {
			margin-top: 20px;
		}
		.bio-box {
			margin: 16px;
			width: 80%;
		}
		.selectors{
		text-align: center;
		}
		.selectors select {
			margin-bottom: 20px;
			width: 80%;
			height: 40px;
			padding: 10px;
    		appearance: none;
		}
	}

</style>

<svelte:head>
<title>Final Show - 2021</title>
</svelte:head>

<section class="section bg-col-7">
	<div class="container page-max-width artists-container">
		<div class="content">

			<div class="selectors">
				<!-- Select by theme -->
				<select bind:value={theme}>
					<option value={null} selected>Theme</option>
					{#each tags.themes as theme}
					<option>{theme}</option>
					{/each}
				</select>

				<!-- Select by media -->
				<select bind:value={media}>
					<option value={null} selected>Media</option>
					{#each tags.media as media}
					<option>{media}</option>
					{/each}
				</select>

				<!-- Select by year -->
				<select bind:value={year}>
					<option value={null} selected>Year</option>
					{#each tags.years.reverse() as year}
					<option>{year}</option>
					{/each}
				</select>
			</div>

			<div class="bio-boxes">
				<!-- for loop to go through artists and display -->
				{#each artistsFiltered as artist, i (artist.username)}
				<div
				class="bio-box"
				transition:fly={{ duration: 300, y: 200 }}
				animate:flip={{ delay: i * 10, duration: 400 }}>
				<a href="artists/{slugify(artist.name)}">
					<div class="bio-photo-container">
					<div
					class="bio-photo-BG"/>
					<div
					class="bio-photo"
					style="background-image:url(img/bios/{artist.username}.jpeg),url(img/grain400.png);"/>
					</div>
					<h6>
						{artist.name}
						{artist.otherName ? `  (${artist.otherName})` : ''}
					</h6>
					<p>{artist.title}</p>
					<!-- No at titles it looks bad -->
				</a>
			</div>
			{:else}
			<div>
				Sorry your filter return no results
				<br />
				<div class="button" on:click={() => (theme = media = year = null)}>
					Click here to remove filters
				</div>
			</div>
			{/each}
		</div>
	</div>
</div>
</section>
