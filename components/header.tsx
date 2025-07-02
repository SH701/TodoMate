import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { categoryEmoji, type Category } from '../constants/category';
import { Feather } from '@expo/vector-icons';

interface Props {
  category: Category;
  setCategory: (value: Category) => void;
  categories: readonly Category[];
  theme: any;
  styles: any;
  color: 'light' | 'dark';
  toggle:()=>void
}

export default function Header({color, toggle,category,setCategory,categories,theme,styles}: Props) {
  const [showList, setShowList] = useState(false);
  return (
    <View style={[styles.header, { position: 'relative' }]}>
      <TouchableOpacity onPress={() => setShowList((prev) => !prev)}>
        <Text style={[styles.btn,{color:theme.text}]}>
           {categoryEmoji[category]} {category} ▼
        </Text>
      </TouchableOpacity>

      {showList && (
        <View
          style={{
            position: 'absolute',
            top: 35,
            backgroundColor: theme.toDoBg,
            padding: 10,
            borderRadius: 8,
            zIndex: 10,
          }}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setCategory(item);
                setShowList(false);
              }}
              style={{ paddingVertical: 6 }}
            >
              <Text
                style={{
                  fontSize:16,
                  color:  theme.text,
                  fontWeight: item === category ? 'bold' : 'normal',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
            <TouchableOpacity onPress={toggle} style={{ padding: 8 }}>
        {color === 'dark' ? (
          <Feather name="sun" size={35} color={theme.text} />
        ) : (
          <Feather name="moon" size={35} color={theme.text} />
        )}
      </TouchableOpacity>
    </View>
  );
}
