<script lang="ts">
    import type {NetworkAdapterServer} from "../../../models/server/networkAdapter";
    import NetworkAdapterIcon from "./NetworkAdapterIcon.svelte";

    export let networkAdapter: NetworkAdapterServer
</script>

<style>
    article {
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.07),0 3px 1px -2px rgba(0,0,0,0.6),0 1px 5px 0 rgba(0,0,0,0.2);
        display: flex;
        flex-direction: row;
        border-radius: 5px;
        padding: 5px;
        width: 100%;
    }

    b, span {
        display: block;
    }

    div {
        margin-left: 10px;
    }
</style>

<article>
    <NetworkAdapterIcon {networkAdapter} />
    <div>
        <b>{networkAdapter.ip}</b>
        <span>{networkAdapter.adapterName}</span>
    </div>
</article>
