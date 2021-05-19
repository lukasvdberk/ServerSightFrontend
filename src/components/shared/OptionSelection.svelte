<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let options: {name: string, value:boolean}[]

    const eventDispatcher = createEventDispatcher()
</script>

<style>
    button {
        display: inline-block;
    }
    div {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        position: relative;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.07),0 3px 1px -2px rgba(0,0,0,0.6),0 1px 5px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        background-color: white;
        text-align: left;
        padding: 5px;
    }
</style>

{#each options as option}
    <div>
        <!--   TODO add better icon     -->
        <button on:click={() => option.value = !option.value}>
            {option.value ? "X" : ""}
        </button>
        <span>{option.name}</span>
    </div>
{/each}
