import services      from './services'
import organizations from './organizations'
import users         from './users'

export default {
    namespaced: true,
    modules: {
        services,
        organizations,
        users
    }
}
