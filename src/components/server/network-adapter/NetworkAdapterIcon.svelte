<script lang="ts">
    import type {NetworkAdapterServer} from "../../../models/server/networkAdapter";

    export let networkAdapter: NetworkAdapterServer

    function isLocalNetwork(networkAdapter: NetworkAdapterServer) {
        const isLocalNetwork = new RegExp('/(^127\\.)|(^192\\.168\\.)|(^10\\.)|(^172\\.1[6-9]\\.)|(^172\\.2[0-9]\\.)|(^172\\.3[0-1]\\.)|(^::1$)|(^[fF][cCdD])/')
        return isLocalNetwork.test(networkAdapter.adapterName)
    }

    $: isLocalNetwork(networkAdapter)
</script>

{#if isLocalNetwork(networkAdapter)}
    <img src="server/network-adapter-icons/home_network_icon.svg" alt="home network icon" />
{:else }
    <img src="server/network-adapter-icons/outside_network.svg" alt="home network icon" />
{/if}
