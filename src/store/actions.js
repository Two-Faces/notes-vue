export default {
    /**
     * Запись заметок в localStorage
     * @param notes
     */
    writeStorage({getters}) {
        localStorage.setItem('notes', JSON.stringify(getters.getNotes));
    },
    /**
     * Получение всех заметок из localStorage
     * @param commit
     */
    getNotes({commit}) {
        const notes = localStorage.getItem('notes');

        if(notes)
            commit('setNotes', JSON.parse(notes));
    }
}