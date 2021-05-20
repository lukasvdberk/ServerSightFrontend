<script>
    import {onMount} from "svelte";
    import {fade} from 'svelte/transition';
    import {Auth} from "../services/auth/auth";
    import LoadingSpinner from "../components/shared/LoadingSpinner.svelte";
    import SecondaryLink from "../components/shared/buttons/SecondaryLink.svelte";
    import FeatureCard from "../components/about/FeatureCard.svelte";
    import Container from "../components/shared/Container.svelte";
    import { goto } from "@sapper/app";

    const animationDurationInMs = 500
    let showInformationPage = false

    onMount(async () => {
        // if not logged in show them is about page
        if (Auth.isUserLoggedIn()) {
            await goto('/servers', {})
        } else {
            showInformationPage = true
        }
    })
</script>
<style>
    .gradient-background, .gradient-background:after {
        height: 100vh;
        width: 100vw;
        background: linear-gradient(180deg, rgba(52, 73, 102, 1) 0%, rgba(13, 24, 33, 1) 100%);
    }

    section.welcome-message {
        padding: 0;
        margin-top: 10px;
        margin-bottom: 10px;
        display: inline-flex;
        flex-direction: row;
        align-items: flex-start;
        width: 100%;
    }

    .feature-grid {
        display: grid;
        height: 100%;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        list-style-type: none;
        grid-gap: 25px;
        margin: 0;
        padding: 0;
    }

    img {
        height: 190px;
        margin-right: 20px;
    }

    h1.welcome-message {
        display: block;
        font-size: 80px;
    }

    p.welcome-message {
        font-size: 20px;
        padding-left: 2.5px;
    }

    span {
        display: block;
        padding-top: 7px;
        padding-left: 5px;
        padding-right: 5px;
    }

    div.link-wrapper {
        display: inline-block;
        width: 150px;
        margin-right: 10px;
    }

    h1.welcome-message, p.welcome-message {
        display: block;
        color: white;
        margin-bottom: 5px;
        width: 100%;
        text-align: left;
    }

    div.welcome-message {
        padding-bottom: 5px
    }

    @media only screen and (max-width: 1000px) {
        img {
            display: block;
            width: 25%;
            height: 25%;
            margin: 0 auto;
        }

        section.welcome-message {
            display: block;
        }

        div.link-wrapper {
            margin-top: 10px;
        }

        h1.welcome-message {
            font-size: 30px;
        }

        p.welcome-message {
            font-size: initial;
        }

        .feature-grid {
            grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
        }

        div.welcome-message {
            width: 100%;
            display: block;
        }

        div.link-wrapper {
            width: 100%;
        }

        .gradient-background, .gradient-background:after {
            height: 200vh;
        }
    }
</style>

<svelte:head>
    <title>Welcome to server sight</title>
</svelte:head>

{#if showInformationPage}
    <section class="gradient-background" transition:fade={{duration: animationDurationInMs}}>
        <Container cssClass="super-large">
            <section class="welcome-message">
                <img src="/logo-512.png" alt="server sight logo" />
                <div class="welcome-message">
                    <h1 class="welcome-message">Start using server sight!</h1>
                    <p class="welcome-message">
                        Start documenting and getting insights into your servers. This will be done with the following features.
                    </p>
                    <div class="link-wrapper">
                        <SecondaryLink href="/servers">
                            <span>Start using!</span>
                        </SecondaryLink>
                    </div>
                    <div class="link-wrapper">
                        <SecondaryLink href="https://github.com/lukasvdberk/ServerSightFrontend">
                            <span>Github</span>
                        </SecondaryLink>
                    </div>
                </div>
            </section>
            <section class="feature-grid">
                <FeatureCard icon="/feature-icons/description_black_24dp.svg" name="Documentation">
                    <p>Write server documentation in markdown!</p>
                </FeatureCard>
                <FeatureCard icon="/feature-icons/lock_open_black_24dp.svg" name="Opensource">
                    <p>
                        You can see on github that there is nothing funky going around with your server data.
                    </p>
                </FeatureCard>
                <FeatureCard icon="/feature-icons/accessibility_new_black_24dp.svg" name="Easy">
                    <p>Almost everything can be configured from a easy to use dashboard!</p>
                </FeatureCard>
                <FeatureCard icon="/feature-icons/insights_black_24dp.svg" name="Insight">
                    <p>Get usages of different resources on your server</p>
                    <ul>
                        <li>Open ports</li>
                        <li>IP’s</li>
                        <li>Hard disk usage</li>
                        <li>CPU usage</li>
                        <li>RAM Usage</li>
                    </ul>
                </FeatureCard>
                <FeatureCard icon="/feature-icons/notifications_black_24dp.svg" name="Notifications">
                    <p>Get notifications when a resource (for example CPU usage) reaches a certain threshold</p>
                    <ul>
                        <li>Hard disk usage</li>
                        <li>CPU usage</li>
                        <li>RAM Usage</li>
                    </ul>
                </FeatureCard>
                <FeatureCard icon="/feature-icons/psychology_black_24dp.svg" name="Integrations">
                    <p>
                        There is documentation on the usage of the REST API.
                        With that you can even write your own scripts to get your server information
                    </p>
                    <ul>
                        <li>For example get Hard disk usage</li>
                        <li>Or all your servers</li>
                        <li>Events occurred on the different servers</li>
                        <li>And much more!</li>
                    </ul>
                </FeatureCard>
            </section>
        </Container>
    </section>
{:else}
    <span>Redirecting to server page</span>
    <LoadingSpinner/>
{/if}
