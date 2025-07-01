import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, Text,Alert, TouchableOpacity } from 'react-native';
import { appStyles } from './styles/appStyles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darktheme, lighttheme } from './color';
import Header from './components/header';
import InputBar from './components/input';
import ActionBar from './components/actionbar';
import ToDoItem from './components/todoitem';
import Bar from './components/bar';

type ToDo = {
  [key: string]: {
    text: string;
    working: boolean;
    done?:boolean;
  };
};

const STORAGE_KEY = '@toDos';
const MODE_KEY = '@mode';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState<ToDo>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');
  const [color, setColor] = useState<'light' | 'dark'>('light');
  const theme = color === 'dark' ? darktheme : lighttheme;
  const filteredToDos = Object.entries(toDos)
    .filter(([_, todo]) => todo.working === working)
    .sort((a, b) => Number(b[0]) - Number(a[0]));
  const donecount = filteredToDos.filter(([_, todo]) => todo.done).length;
  const totalcount = filteredToDos.length
  const percent = totalcount ===0 ? 0:Math.round((donecount/totalcount)*100)

  const toggle = () => setColor((prev) => (prev === 'light' ? 'dark' : 'light'));
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload: string) => setText(payload);

  const savetoDos = async (value: ToDo) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };
  const savework = async()=>{
    try{
      setWorking(true)
      await AsyncStorage.setItem(MODE_KEY,'work')
    }catch(e){
      console.log(e)
    }
  }
  const savetravel = async () => {
  try{
    setWorking(false);
    await AsyncStorage.setItem(MODE_KEY, 'travel');
  }
  catch(e){
    console.log(e)
  }
};

  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      if (s) setToDos(JSON.parse(s));
    } catch (error) {
      console.log('Failed to load todos:', error);
    }
  };
  useEffect(()=>{
    const loadMode = async() =>{
      const saveMode = await AsyncStorage.getItem(MODE_KEY);
      if(saveMode ==='travel'){
        setWorking(false);
      }else{
        setWorking(true)
      }
    }
    loadMode();
    loadToDos();
  },[])
  const addToDo = async () => {
    if (text === '') return;
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    await savetoDos(newToDos);
    setText('');
  };

  const deleteToDo = (key: string) => {
    Alert.alert('Confirm Deletion', 'Are you sure?', [
      { text: 'cancel', style: 'cancel' },
      {
        text: 'delete',
        style: 'destructive',
        onPress: async () => {
          const updated = { ...toDos };
          delete updated[key];
          setToDos(updated);
          await savetoDos(updated);
        },
      },
    ]);
  };

  const totaldelete = async () => {
    Alert.alert('Confirm Deletion', `Delete all?`, [
      { text: 'cancel', style: 'cancel' },
      {
        text: 'delete',
        style: 'destructive',
        onPress: async () => {
          const updated = Object.entries(toDos)
            .filter(([_, todo]) => todo.working !== working)
            .reduce((acc, [key, todo]) => {
              acc[key] = todo;
              return acc;
            }, {} as ToDo);
          setToDos(updated);
          await savetoDos(updated);
        },
      },
    ]);
  };

  const onEdit = (key:string) =>{
    setEditingId(key);
    setEditedText(toDos[key].text);
      Alert.prompt( 
    'Edit To Do',
    'Enter your new todo text',
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {
          setEditingId(null);
          setEditedText('');
        }
      },
      {
        text: 'Save',
        onPress: async (inputText?:string) => {
         if (!inputText || !inputText.trim()) return;
          const updated = { ...toDos };
          updated[key].text = inputText;
          setToDos(updated);
          await savetoDos(updated);
          setEditingId(null);
          setEditedText('');
        }
      }
    ],
    'plain-text',
    toDos[key].text
  );
};
  const onComplete= async(key:string)=>{
    const updated = {...toDos}
    updated[key].done=!updated[key].done
    setToDos(updated)
    await savetoDos(updated)
  }
  const [modal,setModal] = useState(false);
  return (
    <View style={[appStyles.container, { backgroundColor: theme.bg }]}>      
      <StatusBar style={color === 'dark' ? 'light' : 'dark'} />
      <Header working={working} work={work} travel={travel} theme={theme} styles={appStyles} />
      <TouchableOpacity onPress={() => setModal(true)} style={[appStyles.add,{backgroundColor:theme.bar}]}>
       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.bg, fontSize: 40, lineHeight: 42 }}>+</Text>
        </View>
    </TouchableOpacity>
      <InputBar text={text} onChangeText={onChangeText} onSubmit={addToDo} working={working} theme={theme} styles={appStyles} visible={modal} onClose={()=>setModal(false)}/>
      <Bar styles={appStyles} percent={percent} theme={theme}/>
      <ActionBar color={color} toggle={toggle} onDeleteAll={totaldelete} theme={theme} styles={appStyles} />
      <ScrollView>
        {filteredToDos.length === 0 ? (
          <Text style={{ color: theme.text, textAlign: 'center', marginTop: 150 }}>
           You haven’t added anything yet.
          </Text>
        ) : (
          filteredToDos.map(([key, todo]) => (
            <ToDoItem key={key} id={key} todo={todo} theme={theme} styles={appStyles} onDelete={deleteToDo} onEditPress={onEdit} onComplete={onComplete} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
