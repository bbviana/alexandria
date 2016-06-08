import Snippet from '../Snippet'

const snippets = [
    {
        description: 'Snippet 1',
        files: [
            {name: 'file1.js', type: 'js', content: 'test'}
        ]
    },
    {
        description: 'Snippet 2',
        files: [
            {name: 'file1.java', type: 'java', content: 'test'}
        ]
    }
]

export default (done) => {
    Snippet.create(snippets, done)
}