export default {
    getNotes: state => state.notes,
    getNoteData: state => id => state.notes.find(item => item.id === id)
}