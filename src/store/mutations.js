export default {
    /**
     * Запись новой заметки
     * @param state
     * @param note
     */
    pushNote: (state, note) => {
        const id = state.notes.length + 1;

        state.notes.push({id,...note});
    },
    /**
     * Обновления заметки
     * @param state
     * @param params
     */
    updateNote: (state, params) => {
        state.notes.map(item => item.id === params.id ? params.data : item);
    },
    /**
     * Удаление заметки
     * @param state
     * @param id
     */
    removeNote: (state, id) => {
        state.notes = state.notes.filter(item => item.id !== id);
    },
    /**
     * Перезапись всех существующих заметок
     * @param state
     * @param data
     */
    setNotes: (state, data) => {
        state.notes = data;
    }
}