import AsyncStorage from '@react-native-async-storage/async-storage';

const db = AsyncStorage;

export default {
  find: async key => {
    return JSON.parse(
      await db.getItem(key).catch(err => {
        console.log(err);
        return null;
      }),
    );
  },
  insert: async (key, value) => {
    try {
      const query = await db.setItem(key, value);
      // console.log(query);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async key => {
    return await db.removeItem(key).catch(err => {
      console.log(err);
    });
  },
};
