<script lang="ts">
    import type {Server} from "../../models/server/server";
    import Link from "../shared/buttons/Link.svelte";
    import Img from "../shared/Img.svelte";
    import {BASE_MEDIA_URL} from "../../config";
    import {goto} from "@sapper/app";

    export let server: Server
</script>

<style>
    div.container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 25px;
        height: 50px;
    }

    h1 {
        display: inline-block;
        width: 60%;
        margin: 0;
        padding: 0;
    }

    .circle {
        height: 25px !important;
        width: 30px !important;;
        margin-top: 8px;
        border-radius: 50%;
        display: inline-block;
    }

    div.link {
        display: inline-block;
        width: 35%;
        margin-top: 12px;
    }

    article {
        position: relative;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.07),0 3px 1px -2px rgba(0,0,0,0.6),0 1px 5px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        padding: 5px;
        text-align: center;
        width: 100%;
        height: 100%;
    }

    div.img {
        position: relative;
        height: 350px;
        width: 98%;
        margin: 0;
        padding: 0;
    }

    span, h1 {
        text-align: center;
        display: block;
        padding-top: 5px;
    }

    @media screen and (max-width: 1300px) {
        article {
            width: 100%;
        }

        .circle {
            float: left;
            padding: 5px;
        }

        h1 {
            float: right;
            width: 80%;
            padding: 0;
            margin: 0;
        }

        div.container {
            height: 100px;
        }

        div.container, div.link {
            display: block;
            width: 95%;
        }

        div.link {
            padding-top: 50px;
        }
    }

    @media screen and (max-width: 600px) {
        article {
            width: 97.5%;
        }
    }
</style>
<article>
    <div class="img">
        {#if server.imagePath}
            <Img src={ BASE_MEDIA_URL  + server.imagePath} alt={server.name} />
        {:else}
            <Img src="no-server-image.svg" alt={server.name} />
        {/if}
    </div>
    <div class="container">
        <span
            class="circle"
            style="background-color: {server.powerStatus ? '#70a444': '#d0392f'}; color: {server.powerStatus ? 'green': 'red'}">
        </span>
        <h1>{server.name}</h1>
        <div class="link">
            <Link href="/servers/{server.id}">
                <span>View</span>
            </Link>
        </div>
    </div>
</article>
