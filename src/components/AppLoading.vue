<template></template>

<script>
import {QSpinnerGears as Spinner} from 'quasar';

export default {
    name: "AppLoading",
    beforeMount() {
        this.$q.loading.show({
            spinner: Spinner,
            spinnerColor: 'black',
            spinnerSize: 140,
            message: 'Загрузка приложения',
            messageColor: 'black',
            backgroundColor: 'white',
        })
    },
    beforeDestroy() {
        this.$q.loading.hide();
    }
}
</script>
