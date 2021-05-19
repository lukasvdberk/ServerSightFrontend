<script lang="ts">
    import type {NetworkAdapterServer} from "../../../models/server/networkAdapter";
    import NetworkAdapter from "./NetworkAdapter.svelte";

    export let networkAdapters: NetworkAdapterServer[]
</script>

<style>
    ul {
        list-style-type: none;
        width: 100%;
        margin: 0;
        padding: 10px;
    }

    li {
        width: 95%;
        margin-bottom: 10px;
    }
</style>

<ul>
    {#each networkAdapters as networkAdapter}
        <li>
            <NetworkAdapter {networkAdapter} />
        </li>
    {/each}
</ul>
