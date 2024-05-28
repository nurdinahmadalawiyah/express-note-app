import Note from '../models/note.js';

const resolvers = {
    notes: async () => {
        return await Note.find({});
    },
    noteById: async ({ id }) => {
        return await Note.findById(id);
    },
    createNote: async ({title, content}) => {
        const note = new Note({title, content});
        await note.save();
        return note;
    },
    updateNote: async ({id, title, content}) => {
        return await Note.findByIdAndUpdate(id, {title, content}, {new: true});
    },
    deleteNote: async ({id}) => {
        await Note.findByIdAndDelete(id);
        return true;
    }
};

export default resolvers