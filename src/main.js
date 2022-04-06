import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';
import store from './store/store.js';

import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseInputNumber from './components/ui/BaseInputNumber.vue'
import BaseSelect from './components/ui/BaseSelect.vue'
import BaseKnob from './components/ui/BaseKnob.vue'
import BaseKnobSpacemanBig from './components/ui/BaseKnobSpacemanBig.vue'
import BaseKnobSpacemanSmall from './components/ui/BaseKnobSpacemanSmall.vue'

import TonalChords from './components/tonalPackage/TonalChords.vue'
import TonalIntervals from './components/tonalPackage/TonalIntervals.vue'
import TonalKeys from './components/tonalPackage/TonalKeys.vue'
import TonalNotes from './components/tonalPackage/TonalNotes.vue'
import TonalScales from './components/tonalPackage/TonalScales.vue'
import TonalTonal from './components/tonalPackage/TonalTonal.vue'

import SpacemanDeltaII from './components/scs/template/SpacemanDeltaII.vue'

import './assets/css/styles.scss' // custom styles

const app = createApp(App)
app.use(router)
app.use(store)

// initialise the app with standard E
store.commit('updateAvailableTunings');
store.commit('updateInstrument', {
    tuning: {
        type: 'standard',
        tonality: 'E',
        stringsNotes:[
            "E4",
            "B3",
            "G3",
            "D3",
            "A2",
            "E2",
          ]
    }
});

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-input-number', BaseInputNumber);
app.component('base-select', BaseSelect);
app.component('base-knob', BaseKnob);
app.component('base-knob-spaceman-big', BaseKnobSpacemanBig);
app.component('base-knob-spaceman-small', BaseKnobSpacemanSmall);

app.component('tonal-chords', TonalChords);
app.component('tonal-intervals', TonalIntervals);
app.component('tonal-keys', TonalKeys);
app.component('tonal-notes', TonalNotes);
app.component('tonal-scales', TonalScales);
app.component('tonal-tonal', TonalTonal);

app.component('spaceman-delta', SpacemanDeltaII);

router.isReady().then(() => {
    app.mount('#app');
});
