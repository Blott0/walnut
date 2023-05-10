<script>

    // svelte standard transition
    import { slide } from 'svelte/transition'
    // access to server load data and form
	import { page } from '$app/stores'
    // list module
    import Brandlist from '$lib/Brandlist.svelte'
    // icons
    import Check from '$lib/Check.svelte'
    import Cross from '$lib/Cross.svelte'

    // load data
    let brands = $page.data.data
    // form result if it exists
    let form = $page.form ? $page.form : false
    // dialog element binding
    let modal
    // toggler checkbox binding
    const toggle = {}
    // modal activation
    $:form && modal ? modal.showModal() : false

</script>

<section>
    <div class="container">
        <h1>Brands list</h1>

        <Brandlist {brands} />

        <label class="toggleAdd" for="toggleAdd">
            add
            <input hidden bind:checked="{toggle.add}" id="toggleAdd" type="checkbox">
        </label>

        {#if toggle.add}

            <form transition:slide method="POST" action="?/add">
                <fieldset>
                    <legend>Add Brand</legend>
                    <label for="name">
                        brand name
                        <input required name="name" id="name" type="text" placeholder="brand name">
                    </label>
                    <label for="color1">
                        primary color
                        <input required name="color1" id="color1" type="color">
                    </label>
                    <label for="color2">
                        secondary color
                        <input required name="color2" id="color2" type="color">
                    </label>
                    <label for="color3">
                        tertiary color
                        <input required name="color3" id="color3" type="color">
                    </label>
                    <label for="logo">
                        URL to logo
                        <input required name="logo" id="logo" type="url" placeholder="brand logo url">
                    </label>
                    <div class="btnWrapper">
                        <label for="submit">
                            submit
                            <Check />
                            <input hidden id="submit" type="submit">
                        </label>
                        <label on:click="{() => { toggle.add = false }}">
                            cancel
                            <Cross />
                        </label>
                    </div>
                </fieldset>
            </form>

        {/if}

        <dialog bind:this="{modal}">
            <form method="dialog">
                <fieldset>
                    <legend>Message</legend>
                    <p>{form.success ? 'Brand added!' : form.logo ? 'failed: Logo invalid' : 'failed'}</p>
                    <div class="btnWrapper">
                        <label for="ok">
                            ok
                            <Check />
                            <input hidden id="ok" type="submit">
                        </label>
                    </div>
                </fieldset>
            </form>
        </dialog>

    </div>
</section>

<style lang="postcss">
    dialog {
        @apply bg-transparent;
    }
    .toggleAdd {
        @apply inline-block cursor-pointer bg-black pl-3 py-2 pr-8 my-6 rounded-lg;
        position: relative;
    }
    .toggleAdd::after {
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
    .toggleAdd:has( > input:checked )::after {
        transform: translateY(-50%) rotate(135deg);
    }
    .btnWrapper > label {
        font-size: 0;
    }
</style>