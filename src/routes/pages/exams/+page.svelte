<script lang="ts">
    import {bookOutline, createOutline, ellipsisHorizontalOutline, schoolOutline} from 'ionicons/icons';
    import type { ExamItem } from '$components/schedule/exam/ExamItem';
    import ExamCard from '$components/schedule/exam/examCard.svelte';
    import { getDayByIndex } from '$components/schedule/day/days';
    import { Capacitor } from '@capacitor/core';
	import { onMount } from 'svelte';
	import { universisGet } from '$lib/dataService';

    let exams : Array<ExamItem> = [];
    onMount(async() => {
        let fetchedExams = (await universisGet('students/me/availableCourseExamEvents?$top=-1')).value;
        exams = fetchedExams.map((exam: any) => {
            return {
                id: exam.courseExam.course,
                subject: exam.name,
                classroom: exam.location.name,
                date: {
                    weekDay: getDayByIndex((new Date(exam.startDate)).getDay(), 'el', true),
                    monthDate: (new Date(exam.startDate)).getDate() + '/' + ((new Date(exam.startDate)).getMonth() + 1),
                    startTime: (new Date(exam.startDate)).getHours() + ':' + (new Date(exam.startDate)).getMinutes(),
                    endTime: (new Date(exam.endDate)).getHours() + ':' + (new Date(exam.endDate)).getMinutes()
                }
            }   
        });
    });
</script>


<ion-header collapse="condense" mode="ios">
    <ion-toolbar mode={Capacitor.getPlatform() != 'ios' ? 'md': undefined}>
      <ion-title class="ion-padding-vertical" size="large">Πρόγραμμα εξετάσεων</ion-title>
    </ion-toolbar>
</ion-header>

<ion-tab tab="schedule"></ion-tab>


<ion-fab horizontal="end" vertical="bottom">
    <ion-fab-button color="light">
       <ion-icon icon={ellipsisHorizontalOutline} />
    </ion-fab-button>
    <ion-fab-list side="top">
       <ion-fab-button color="primary" href="/pages/tasks" data-desc="Συμβάντα">
          <ion-icon icon={createOutline} />
       </ion-fab-button>
       <ion-fab-button color="secondary" href="/pages/schedule" data-desc="Μαθήματα">
          <ion-icon icon={bookOutline} />
       </ion-fab-button>
    </ion-fab-list>
 </ion-fab>


    
<ion-content class="ion-padding">
    <div class="examCardList">
        {#each exams as examItem}
            <ExamCard {examItem} />
        {/each}
    </div>
    {#if exams.length === 0}
    <div class="custom-center-label">
        <div class="middle">
            <ion-icon icon={schoolOutline} size="large" style="padding: 15px"></ion-icon>
            <ion-label>Δεν υπάρχουν προγραμματισμένες εξετάσεις.</ion-label>
        </div>
    </div>
    {:else}
        <div style="height: 5rem;"/>
    {/if}
</ion-content>
    
<style>

    .examCardList {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .custom-center-label {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .middle {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        width: 50%;
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