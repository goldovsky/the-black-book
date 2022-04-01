import { createRouter, createWebHistory } from 'vue-router';
import ViewHome from './components/views/ViewHome.vue';
import ViewChordsDiagrams from './components/views/ViewChordsDiagrams.vue';
import ViewFretboard from './components/views/ViewFretboard.vue';
import ViewMetronome from './components/views/ViewMetronome.vue';
import ViewSignalChainSketches from './components/views/ViewSignalChainSketches.vue';
import ViewSettings from './components/views/ViewSettings.vue';
import ViewPlayback from './components/views/ViewPlayback.vue';
import ViewTonalPackage from './components/views/ViewTonalPackage.vue';

// TODO
// '/' shouldn't redirect home

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ViewHome },
    { path: '/home', redirect: '/' },
    { path: '/chordsdiagrams', component: ViewChordsDiagrams },
    { path: '/fretboard', component: ViewFretboard },
    { path: '/metronome', component: ViewMetronome },
    { path: '/playback', component: ViewPlayback },
    { path: '/signalchainsketches', component: ViewSignalChainSketches },
    { path: '/settings', component: ViewSettings },
    { path: '/tonalpackage', component: ViewTonalPackage },
  ],
});

export default router;
