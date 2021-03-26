import Vue               from 'vue';
import {abilitiesPlugin} from '@casl/vue';
import ability           from "src/helpers/ability";

Vue.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
});
