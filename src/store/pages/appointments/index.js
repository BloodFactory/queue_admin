import settings    from './settings'
import list        from './list'
import templates   from './templates.js'
import template    from './template'
import appointment from './appointment'

export default {
    namespaced: true,
    modules: {
        settings,
        list,
        templates,
        template,
        appointment
    }
}
