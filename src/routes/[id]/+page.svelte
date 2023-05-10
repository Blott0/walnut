<script>

    // server load result
    import { page } from '$app/stores'
    let brand = $page.data.data

</script>

<svelte:head>
	<title>{brand.name} - Brand inspection</title>
</svelte:head>

<section>
    <div class="container">
        {#if brand}
            <img src="{brand.logo}" alt="{brand.name} logo">
            <h1>{brand.name}</h1>
            <div class="colorswrapper">
                <div class="colors" style="background-image:linear-gradient(60deg, {brand.primary_color} 33%, {brand.second_color} 33.1% 66%, {brand.third_color} 66.1%)" />
                <div class="colorsdesc">
                    <div>{brand.primary_color}</div>
                    <div>{brand.second_color}</div>
                    <div>{brand.third_color}</div>
                </div>
            </div>
            <div class="id">{brand.identifier}</div>
        {:else}
            <p>No brand found</p>
        {/if}
    </div>
</section>

<style lang="postcss">
    h1 {
        @apply my-3;
    }
    .colorswrapper {
        @apply grid gap-x-2 grid-cols-2;
    }
    .colorsdesc {
        @apply flex flex-col;
    }
    .colors {
        aspect-ratio: 1.8;
    }
</style>