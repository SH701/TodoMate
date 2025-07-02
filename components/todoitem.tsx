import { View, Text, TouchableOpacity } from 'react-native';
import { Fontisto,Feather } from '@expo/vector-icons';
import Todaylabel from './todaylabel';
import {useState} from 'react'

interface Props {
  id: string;
  todo: { text: string; category: string,done?:boolean };
  theme: any;
  styles: any;
  onDelete: (key: string) => void;
  onEditPress : (key:string) => void;
  onComplete:(key:string)=>void;
}

export default function ToDoItem({ id, todo, theme, styles, onDelete,onEditPress,onComplete }: Props) {
  const [option,setOption] = useState(false)
  return (
    <View style={styles.toDo}>
      <View style={styles.toDoHeader}>
        <Text
          style={[
            styles.toDoText,
            todo.done && { textDecorationLine: 'line-through', opacity: 0.5 },
            { color: theme.text }
          ]}
        >
          {todo.text}
        </Text>

        <TouchableOpacity onPress={() => setOption(prev => !prev)}>
          <Feather name="more-vertical" size={18} color={theme.text} />
        </TouchableOpacity>
         
      </View>
           {todo.category && <Todaylabel theme={theme} />}
      {option && (
        <View style={{flexDirection:'row',justifyContent:'flex-end', alignItems:'flex-end', marginTop: 8, gap: 12 }}>
          <TouchableOpacity onPress={() => onDelete(id)}>
            <Fontisto name="trash" color={theme.text} size={18} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onEditPress(id)}>
            <Fontisto name="player-settings" color={theme.text} size={18} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onComplete(id)}>
            {todo.done ? (
              <Feather name="check-square" size={18} color={theme.text} />
            ) : (
              <Feather name="square" size={18} color={theme.text} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

 