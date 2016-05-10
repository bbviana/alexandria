export default function addDispatchToAction({ dispatch }) {
    return next => action => {
        action.dispatch = dispatch
        return next(action)
    }
}