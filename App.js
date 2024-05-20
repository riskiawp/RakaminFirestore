import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { db, collection, addDoc, getDocs, deleteDoc, doc} from './firebaseConfig';

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = async () => {
    if(note){
      try {
        const docRef = await addDoc(collection(db, "notes"), {
          content: note,
        });
        console.log("Document written with ID: ", docRef.id);
        setNote("");
        getNotes();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const getNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const newNotes = [];
      querySnapshot.forEach((doc) => {
        newNotes.push({ id: doc.id, ...doc.data() });
      });
      setNotes(newNotes);
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  };

  const deleteNote = async (docId) => {
    try {
      await deleteDoc(doc(db, "notes", docId));
      console.log("Document deleted successfully");
      getNotes();
    } catch (e) {
      console.error("Error deleting document:", e);
    }
  };


useEffect(  () => {
  // try {
  //   const docRef = await addDoc(collection(db, "employees"), {
  //     firstName: "Riski",
  //     lastName: "Ananda",
  //     born: 2000
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }  

getNotes();
}, [])



  return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notes App ODP BNI</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNote(text)}
        value={note}
        placeholder="Add note here..."
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={addNote}>Add</Text>
      </TouchableOpacity>
      <View style = {styles.flatListContainer}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item.content}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: '#000',
    fontSize: 30, // Perbesar ukuran font
    fontWeight: 'bold', // Membuat font menjadi bold
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  flatListContainer:{
    width: '100%',
    marginVertical: 20,
  },
  
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10, // Tambahkan borderRadius di sini
    backgroundColor: '#e5e5e5',
  },
  noteText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
