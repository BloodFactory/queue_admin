import services      from './services'
import organizations from './organizations'
import users         from './users'
import appointment   from './appointments'

export default {
    namespaced: true,
    modules: {
        services,
        organizations,
        users,
        appointment
    }
}
