<script lang="ts">
    import {bookOutline, schoolOutline, add, createOutline, ellipsisHorizontalOutline} from 'ionicons/icons';
    import { taskStore } from '$lib/components/schedule/task/taskStore';
    import type { TaskItem } from '$lib/components/schedule/task/TaskItem';
	import TaskCard from '$components/schedule/task/taskCard.svelte';
    import { Capacitor } from '@capacitor/core';    
	import { onMount } from 'svelte';

    let groupedTasks : { [key: string]: TaskItem[] }= {};
    
    let tasks : Array<TaskItem> = $taskStore;
    
    onMount(async() => {    
        // Group tasks by date
        tasks.forEach(task => {
            const startDate = new Date(task.date.startDate);
            const weekday = startDate.toLocaleDateString('el-GR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
            if (!groupedTasks[weekday]) {
                groupedTasks[weekday] = [];
            }
            groupedTasks[weekday].push(task);
        });
        console.log(tasks)
    });
</script>

<ion-tab tab="schedule"></ion-tab>

<ion-header collapse="condense" mode="ios">
    <ion-toolbar mode={Capacitor.getPlatform() != 'ios' ? 'md': undefined}>
      <ion-title class="ion-padding-vertical" size="large">Συμβάντα</ion-title>
      <ion-buttons slot="end">
        <ion-button href="/pages/tasks/addTask">
          <ion-icon slot="icon-only" icon={add}></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
</ion-header>

<ion-fab horizontal="end" vertical="bottom">
    <ion-fab-button color="light">
       <ion-icon icon={ellipsisHorizontalOutline} />
    </ion-fab-button>
    <ion-fab-list side="top">
       <ion-fab-button color="primary" href="/pages/schedule" data-desc="Μαθήματα">
          <ion-icon icon={bookOutline} />
       </ion-fab-button>
       <ion-fab-button color="secondary" href="/pages/exams" data-desc="Εξετάσεις">
          <ion-icon icon={schoolOutline} />
       </ion-fab-button>
    </ion-fab-list>
 </ion-fab>



<ion-content style="overflow-y: auto;">
    <ion-grid>
        {#each Object.entries(groupedTasks) as [weekday, tasks]}
            <ion-div>
                <br />
                <ion-label style="margin-left: 8px">{weekday}</ion-label>
                {#each tasks as task}
                    <TaskCard taskItem={task} />
                {/each}
            </ion-div>
        {/each}
    </ion-grid>
    <ion-row class="custom-center-label">
        {#if tasks.length === 0}
            <ion-icon icon={createOutline} size="large" style="padding: 15px"></ion-icon>
            <ion-label>Δεν υπάρχουν συμβάντα.</ion-label>
        {:else}
            <div style="height: 5rem;"/>
        {/if}
    </ion-row>
</ion-content>

<style>
    .custom-center-label {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    
    ion-fab-button[data-desc] {
        position: relative;
    }

    ion-fab-button[data-desc]::after {
        position: absolute;
        content: attr(data-desc);
        z-index: 1;
        right: 40px;
        bottom: 4px;
        padding: 9px;
        border-radius: 15px;
        color: var(--ion-color-dark);
        text-align: end;
    }
</style>