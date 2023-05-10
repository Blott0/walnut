<script>
    import '../app.css'
</script>

<header>
    <a href="/">
        <img src="https://walnut.nl/large.png" alt="walnut logo">
    </a>
</header>

<main>
    <slot />
</main>

<style>
    header {
        @apply bg-black;
    }
    header > a > img {
        @apply p-3 h-16;
    }
</style>