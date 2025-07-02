import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, Text,Alert, TouchableOpacity } from 'react-native';
import { appStyles } from './styles/appStyles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darktheme,lighttheme } from './constants/color';
import Header from './components/header';
import InputBar from './components/input';
import ActionBar from './components/actionbar';
import ToDoItem from './components/todoitem';
import Bar from './components/bar';
import {categories, type Category } from './constants/category';

type ToDo = {
  [key: string]: {
    text: string;
    category: Category;
    done?:boolean;
  };
};

const STORAGE_KEY = '@toDos';
const CATEGORY_KEY = `@category`;

export default function App() {
  const [category, setCategory] = useState<Category>("Work");
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState<ToDo>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');
  const [color, setColor] = useState<'light' | 'dark'>('light');
  const theme = color === 'dark' ? darktheme : lighttheme;
  const filteredToDos = Object.entries(toDos)
    .filter(([_, todo]) => todo.category  === category )
    .sort((a, b) => Number(b[0]) - Number(a[0]));
  const donecount = filteredToDos.filter(([_, todo]) => todo.done).length;
  const totalcount = filteredToDos.length
  const percent = totalcount ===0 ? 0:Math.round((donecount/totalcount)*100)
  const toggle = () => setColor((prev) => (prev === 'light' ? 'dark' : 'light'));
  const onChangeText = (payload: string) => setText(payload);
  const loadToDos = async () => {
  try {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) setToDos(JSON.parse(s)); 
  } catch (error) {
    console.log('Failed to load todos:', error);
  }
};
  useEffect(()=>{
    const init = async()=>{
      const savedcategory = await AsyncStorage.getItem(CATEGORY_KEY);
      if(savedcategory && categories.includes(savedcategory as Category)){
        setCategory(savedcategory as Category)
      }
      await(loadToDos)
    }
    init();
  },[])
  useEffect(() => {
  AsyncStorage.setItem(CATEGORY_KEY, category);
}, [category]);

  const savetoDos = async (value: ToDo) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const addToDo = async () => {
    if (text === '') return;
    const newToDos = { ...toDos, [Date.now()]: { text, category,done:false } };
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
            .filter(([_, todo]) => todo.category !== category)
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
      <Header category={category} color={color} toggle={toggle} categories={categories} setCategory={setCategory} theme={theme} styles={appStyles} />
      <TouchableOpacity onPress={() => setModal(true)} style={[appStyles.add,{backgroundColor:theme.bar}]}>
       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.bg, fontSize: 40, lineHeight: 42 }}>+</Text>
        </View>
    </TouchableOpacity>
      <InputBar text={text} category={category} onChangeText={onChangeText} onSubmit={addToDo} theme={theme} styles={appStyles} visible={modal} onClose={()=>setModal(false)}/>
      <Bar styles={appStyles} percent={percent} theme={theme}/>
      <ActionBar  onDeleteAll={totaldelete} theme={theme} styles={appStyles} />
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
