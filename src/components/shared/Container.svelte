<script lang="ts">
    export let cssClass: "large" | "default" = "default"
</script>

<style>
    section.default {
        margin: 0 auto;
        padding-top: 150px;
        height: 100vh;
        width: 40%;
    }

    section.large {
        margin: 0 auto;
        height: 100%;
        width: 60%;
    }

    section.super-large {
        margin: 0 auto;
        height: 100%;
        width: 70%;
    }

    @media screen and (max-width: 1000px) {
        section.default, section.large, section.super-large {
            padding-top: 10px;
            width: 90%;
        }
    }
</style>

<section class={cssClass}>
    <slot />
</section>
