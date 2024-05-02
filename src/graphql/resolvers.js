import Note from '../models/note.js';
import redisClient from "../redis/redisClient.js";

const resolvers = {
    notes: async () => {
        return await Note.find({});
    },
    noteById: async ({id}) => {
        const cacheNote = await redisClient.get(id);
        if (cacheNote) {
            const parsedNote = JSON.parse(cacheNote);
            // Pastikan id dari catatan di Redis adalah sama dengan id yang diminta
            if (parsedNote.id === id) {
                return parsedNote;
            }
        }

        const note = await Note.findById(id);
        if (note) {
            await redisClient.setEx(id, 3600, JSON.stringify(note));
            return note;
        } else {
            return null; // Mengembalikan null hanya jika catatan tidak ditemukan di MongoDB
        }
    },
    createNote: async ({title, content}) => {
        const note = new Note({title, content});
        await note.save();
        return note;
    },
    updateNote: async ({id, title, content}) => {
        const note = await Note.findByIdAndUpdate(id, {title, content}, {new: true});
        await redisClient.setEx(id, 3600, JSON.stringify(note)); // Update cache
        return note;
    },
    deleteNote: async ({id}) => {
        await Note.findByIdAndDelete(id);
        await redisClient.del(id); // Remove from cache
        return true;
    }
};

export default resolvers