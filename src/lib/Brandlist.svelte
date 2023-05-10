<script>

    export let brands

    import Search from '$lib/Search.svelte'
    import Duck from '$lib/Duck.svelte'

    let searchTerm
    let toggleSearch
    let reversed
    $:brandsSorted = reversed ? brands.sort((a,b) => {return (a.name > b.name ? 1 : -1)}).reverse() : brands.sort((a,b) => {return (a.name > b.name ? 1 : -1)})
    $:brandsFiltered = searchTerm && toggleSearch && searchTerm !== '' ? brandsSorted.filter(listfilter) : brandsSorted
    
    const randomDuckId = brands[Math.ceil(Math.random() * brands.length) - 1].identifier

    function listfilter(item) {
        return item.name.match(new RegExp(searchTerm, 'i'))
	}

    function strreplace(str, sv) {
        let oldvalue = str
        let newvalue = ''
        if (sv) {
            const searchregex = new RegExp(sv, 'i')
            while (oldvalue.match(searchregex)) {
                const match = oldvalue.match(searchregex)
                newvalue = newvalue + oldvalue.substr(0, match.index) + '<mark>' + oldvalue.substr(match.index, match[0].length) + '</mark>'
                oldvalue = oldvalue.substr(match.index + match[0].length)
            }
            return newvalue + oldvalue
        }
        return oldvalue
    }

</script>

<div class="header">
    <label for="reverse">
        sort
        <input bind:checked="{reversed}" id="reverse" hidden type="checkbox">
    </label>
    <label for="searchtoggle" title="toggle search">
        search
        <input hidden bind:checked="{toggleSearch}" id="searchtoggle" type="checkbox">
        <input class="search" bind:value="{searchTerm}" type="text">
        <Search />
    </label>
</div>


<ul>
    {#each brandsFiltered as brand}
        <li>
            <a href="/{brand.identifier}">
                <div class="logo">
                    {#if brand.identifier === randomDuckId}
                        <Duck />
                    {:else}
                        <img src="{brand.logo}" alt="{brand.name} logo">
                    {/if}
                </div>
                <div class="name">
                    {@html searchTerm && toggleSearch && searchTerm !== '' ? strreplace(brand.name, searchTerm) : brand.name}
                </div>
                <div class="id">{brand.identifier}</div>
            </a>
        </li>
    {/each}
</ul>

<style lang="postcss">
    .header {
        @apply flex font-bold justify-between p-3 bg-black border-x-2 border-black rounded-t-lg items-center;
    }
    .header > label {
        @apply pr-7;
        position: relative;
    }
    .header > label:first-of-type::after {
        @apply transition-transform border-white;
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%) rotate(-45deg);
        border-width: 4px;
        border-bottom-color: transparent;
        border-left-color: transparent;
        height: 0;
        width: 0;
    }
    .header > label:has( > input:checked )::after {
        transform: translateY(-50%) rotate(135deg);
    }
    label:nth-of-type(2) {
        @apply flex;
        font-size: 0;
    }
    label > input {
        font-size: initial;
    }
    label > input + input {
        @apply scale-x-0 origin-right ml-4 transition-transform;
    }
    label > input:checked + input {
        @apply scale-x-100;
    }
    ul {
        @apply border-black border-2 rounded-b-lg overflow-hidden;
    }
    a {
        @apply grid gap-x-2 hover:bg-hover focus:bg-hover outline-0 transition;
        grid-template-columns: 20% calc(80% - 24px - .5rem);
        grid-template-areas: "a b"
                             "a c";
    }
    .logo {
        @apply flex h-12 items-center p-3;
        grid-area: a;
    }
    .logo > img, .logo > :global(svg) {
        @apply max-h-9;
    }
    .name {
        @apply text-xl truncate md:flex md:items-center;
        grid-area: b;
    }
    .id {
        @apply text-xs md:flex md:items-center;
        grid-area: c;
    }
    @media (min-width: 768px) {
        a {
            grid-template-columns: 20% calc(50% - 12px - .5rem) calc(30% - 12px - .5rem);
            grid-template-areas: "a b c"
        }
    }
</style>