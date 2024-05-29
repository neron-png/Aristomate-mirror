<script>
	import * as allIonicIcons from 'ionicons/icons';
	import Modal, {getModal} from '$components/language/Modal.svelte'
	import { onMount } from 'svelte';
	import { t, locale } from '$lib/translations';

	
    onMount(async() => {
        let a = $locale;
        console.log('Locale: ' + a);
    });

	/**
	 * @type {any}
	 */
	 export let logOut;
</script>

<ion-card>
	<ion-card-content>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<ion-item button on:click={()=>getModal().open()}>
			<ion-icon size="small" icon={allIonicIcons.language} />
			<ion-label class="ion-padding-start">{$t('personal.language')}</ion-label>
			<ion-icon size="small" icon={allIonicIcons.chevronForwardCircle} />
		</ion-item>

		<ion-item button href="/about">
			<ion-icon size="small" icon={allIonicIcons.people} />
			<ion-label class="ion-padding-start">{$t('personal.about')}</ion-label>
			<ion-icon size="small" icon={allIonicIcons.chevronForwardCircle} />
			
		</ion-item>

		<!-- <ion-item button>
			<ion-icon size="small" icon={allIonicIcons.brush} />
			<ion-label class="ion-padding-start">Change Theme</ion-label>
			<ion-icon size="small" icon={allIonicIcons.chevronForwardCircle} />
		</ion-item> -->

		<ion-item button href="/faq">
			<ion-icon size="small" icon={allIonicIcons.helpCircle} />
			<ion-label class="ion-padding-start">FAQ</ion-label>
			<ion-icon size="small" icon={allIonicIcons.chevronForwardCircle} />
		</ion-item>

	
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<ion-item button lines="none" on:click={logOut}>
			<ion-icon color="danger" size="small" icon={allIonicIcons.exit} />
			
			<ion-label color="danger" class="ion-padding-start">{$t('personal.logout')}</ion-label>
			<ion-icon color="danger" size="small" icon={allIonicIcons.chevronForwardCircle} />
			
		</ion-item>

		</ion-card-content>

	</ion-card>

	<!-- the modal without an `id` -->
	<Modal />

	<style>

	ion-icon {
		color: var(--app-color-primary-dark);
	}

	</style>
 