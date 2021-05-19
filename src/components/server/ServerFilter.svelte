<script lang="ts">
    import Input from "../shared/Input.svelte";
    import Toggler from "../shared/buttons/Toggler.svelte";
    import {createEventDispatcher} from "svelte";
    import OptionSelection from "../shared/OptionSelection.svelte";

    const eventDispatcher = createEventDispatcher()

    let nameSearch = ''
    let ipSearch = ''
    let powerStatus = undefined;

    let powerOptions: {name: string, value:boolean}[] = [
        {
            name: '🟢 Online',
            value: false
        },
        {
            name: '🔴 Offline',
            value: false
        }
    ]

    function onNewValue(nameSearch, powerStatusToggle, ipSearch) {
        eventDispatcher('filter', {
            name: nameSearch,
            powerstatus: powerStatusToggle,
            ip: ipSearch
        })
    }

    function onNewPowerSettings(powerOptions: {name: string, value:boolean}[]) {
        const powerOn = powerOptions.filter((option) => option.name.includes('Online') && option.value).length > 0
        const powerOff = powerOptions.filter((option) => option.name.includes('Offline') && option.value).length > 0


        if(powerOn) powerStatus = true
        if(powerOff) powerStatus = false
        // no option was selected or all were selected
        if((powerOn && powerOff) || (!powerOn && !powerOff)) powerStatus = undefined

        onNewValue(nameSearch, powerStatus, ipSearch)
    }

    $: onNewValue(nameSearch, powerStatus, ipSearch)
    $: onNewPowerSettings(powerOptions)
</script>

<form on:submit|preventDefault>
    <Input bind:value={nameSearch} labelTxt="Search by name" placeholder="Search by name" type="text" />
    <Input bind:value={ipSearch} labelTxt="Search by ip" placeholder="Search by ip" type="text" />

    <label>Power status</label>
    <OptionSelection bind:options={powerOptions} />
</form>
