<script lang="ts">
    import {onMount} from "svelte";
    import {goto, stores} from "@sapper/app";
    import {ServerService} from "../../services/server/serverService";
    import type {Server} from "../../models/server/server";
    import {popUpMessageStore} from "../../stores/popupMessagesStore";
    import Img from "../../components/shared/Img.svelte";
    import Container from "../../components/shared/Container.svelte";
    import Button from "../../components/shared/buttons/Button.svelte";
    import {BASE_MEDIA_URL} from "../../config";
    import ServerForm from "../../components/server/ServerForm.svelte";
    import type {FieldError} from "../../services/error/field.error";
    import ErrorList from "../../components/errors/ErrorList.svelte";
    import {FieldsErrors} from "../../services/error/fields.error";
    import MarkdownViewer from "../../components/shared/MarkdownViewer.svelte";
    import {ServerNetworkAdapterService} from "../../services/server/serverNetworkAdapterService";
    import type {NetworkAdapterServer} from "../../models/server/networkAdapter";
    import NetworkAdapterList from "../../components/server/network-adapter/NetworkAdapterList.svelte";
    import LoadingSpinner from "../../components/shared/LoadingSpinner.svelte";
    import {ServerHardDiskService} from "../../services/server/serverHardDiskService";
    import type {HardDiskServer} from "../../models/server/hardDisk";
    import HardDiskList from "../../components/server/hard-disks/HardDiskList.svelte";
    import type {PortServer} from "../../models/server/port";
    import {ServerPortService} from "../../services/server/serverPortService";
    import PortList from "../../components/server/ports/PortList.svelte";
    import ServerNavBar from "../../components/server/ServerNavBar.svelte";
    import Link from "../../components/shared/buttons/Link.svelte";
    import PostScriptSetupGuide from "../../components/server/PostScriptSetupGuide.svelte";


    const {page} = stores();

    const {id} = ($page as any).params;

    let server: Server = undefined
    let serverIcon: any = undefined

    let fieldsErrors: FieldError[] = []
    let editMode: boolean = false

    // all properties of a single server
    let networkAdapters: NetworkAdapterServer[] = []
    let hardDisks: HardDiskServer[] = []
    let ports: PortServer[] = []

    onMount(() => {
        getAndSetServer()
    })

    function toggleEditMode(): void {
        editMode = !editMode
    }

    function updateServer(): void {
        ServerService.updateServer(server, serverIcon ? serverIcon[0] : undefined).then(() => {
            popUpMessageStore.addMessage(`Updated ${server.name}`)
            editMode = false
            getAndSetServer()
        }).catch((err) => {
            if (err instanceof FieldsErrors) {
                fieldsErrors = (err as FieldsErrors).fields
            }
        })
    }

    function deleteServer(): void {
        ServerService.deleteServer(server).then(() => {
            popUpMessageStore.addMessage(`Deleted ${server.name}`)
            goto('/servers', {}).then()
        }).catch((ignored) => {
            popUpMessageStore.addMessage('Failed to delete server')
        })
    }

    function getAndSetServer(): void {
        ServerService.getServer(id).then((fetchedServer) => {
            server = fetchedServer

            _getAndSetNetworkAdapters()
            _getAndSetHardDisks()
            _getAndSetPorts()
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }

    function _getAndSetNetworkAdapters(): void {
        ServerNetworkAdapterService.getNetworkAdaptersOfServer(server).then((networkAdaptersServer) => {
            networkAdapters = networkAdaptersServer
        }).catch((err) => {
            popUpMessageStore.addMessage('Could not fetch network adapters of server')
        })
    }

    function _getAndSetHardDisks(): void {
        ServerHardDiskService.getHardDisksOfServer(server).then((hardDisksOfServers) => {
            hardDisks = hardDisksOfServers
        }).catch((err) => {
            popUpMessageStore.addMessage('Could not fetch the hard disks of this server')
        })
    }

    function _getAndSetPorts(): void {
        ServerPortService.getPortsOfServer(server).then((portsOfServer) => {
            ports = portsOfServer
        }).catch((err) => {
            popUpMessageStore.addMessage('Could not fetch the ports of this server')
        })
    }
</script>

<style>
    section.container {
        padding-right: 25px;
        padding-left: 25px;
    }

    .icon, .side-bar {
        display: inline-block;
        width: 30%;
    }

    .icon {
        position: relative;
        height: 180px;
        padding: 5px;
    }

    .main-content {
        display: inline-block;
        vertical-align: top;
        width: 69%;
    }

    details {
        position: relative;
        box-shadow: 0 1px 1px 0 rgb(52, 73, 102),0 3px 1px -2px rgb(52, 73, 102),0 1px 5px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        text-align: left;
        padding: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
    }
    summary {
        font-weight: bold;
    }

    .header {
        width: auto;
        display: inline-block;
        vertical-align: top;
        margin: 0;
        padding: 0;
    }

    h3 {
        height: 40px;
        font-weight: bold;
    }

    div.inline {
        display: inline-block;
        vertical-align: bottom;
        width: 150px;
    }

    @media only screen and (max-width: 1000px) {
        .side-bar {
            display: block;
            width: 100%;
            margin: 0;
        }

        .header {
            margin-bottom: 10px;
        }

        .main-content {
            display: block;
            width: 100%;
        }

        details {
            width: calc(100vw - 100px);
        }
    }
</style>

<svelte:head>
    {#if server}
        <title>Server { server.name }</title>
    {/if}
</svelte:head>

<section class="container">
    {#if server}
        <ServerNavBar {server} />
        <section>
            <div class="icon">
                {#if server.imagePath}
                    <Img src={ BASE_MEDIA_URL + server.imagePath } alt={server.name} />
                {:else }
                    <Img src="no-server-image.svg" alt={server.name} />
                {/if}
            </div>
            <div class="header">
                <h1>{server.name}</h1>
                <p>Server id: <b>{server.id}</b></p>
                <div class="inline">
                    <Button on:click={toggleEditMode}>{editMode ? 'View' : 'Edit' }</Button>
                </div>
                <div class="inline">
                    <Button on:click={deleteServer} backgroundColor="#721c24">Delete</Button>
                </div>
            </div>
        </section>
        <section class="side-bar">
            <PostScriptSetupGuide />
            <details>
                <summary>Network adapters</summary>
                <NetworkAdapterList {networkAdapters} />
            </details>
            <details>
                <summary>Hard disks</summary>
                <HardDiskList {hardDisks} />
            </details>
            <details>
                <summary>Open ports</summary>
                <PortList {ports} />
            </details>
        </section>
        <section class="main-content">
            {#if editMode}
                <div>
                    <ErrorList fieldsErrors={fieldsErrors} />
                    <ServerForm
                        bind:server={server}
                        bind:serverIcon={serverIcon}
                    />
                    <Button on:click={updateServer}>Update</Button>
                </div>
            {:else }
                <h3>Server description:</h3>
                <MarkdownViewer markdown={server.description} />
            {/if}
        </section>
    {:else}
        <LoadingSpinner />
    {/if}
</section>
