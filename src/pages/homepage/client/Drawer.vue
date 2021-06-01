<template>
    <div class="col-2 drawer">
        <div class="column full-height">
            <q-btn-toggle
                :value="value"
                spread
                no-caps
                toggle-color="blue-grey-2"
                toggle-text-color="black"
                color="white"
                text-color="black"
                :options="options"
                class="no-border-radius"
                @input="val => {$emit('input', val)}"
                dense unelevated
            />
            <q-separator/>
            <div style="flex: 1">
                <AppointmentList v-if="'appointments' === value"/>
                <TemplateList v-if="'templates' === value"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
    components: {
        AppointmentList: () => import('./AppointmentList'),
        TemplateList: () => import('./TemplateList')
    },
    data() {
        return {
            options: [
                {label: 'Записи', value: 'appointments'},
                {label: 'Шаблоны', value: 'templates'}
            ]
        }
    },
    mounted() {
        this.$emit('input', this.options[0].value)
    }
}
</script>

<style lang="scss" scoped>
.drawer {
    background: linear-gradient(to bottom, #fff, $grey-2);
    border-right: 1px solid $grey-4;
    box-sizing: content-box;
}
</style>
