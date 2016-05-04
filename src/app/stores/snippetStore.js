import Store from '~/app/helpers/Store'


class SnippetStore extends Store {
    _id = null
    created = null
    description = ''
    files = [{name: null, content: null, type: null}]
    user = {}
}

export default new SnippetStore()