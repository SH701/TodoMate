import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
  color: 'light' | 'dark';
  toggle: () => void;
  onDeleteAll: () => void;
  theme: any;
  styles: any;
}

export default function ActionBar({ color, toggle, onDeleteAll, theme, styles }: Props) {
  return (
    <View style={styles.mid}>
      <TouchableOpacity onPress={toggle} style={{ padding: 8 }}>
        {color === 'dark' ? (
          <Feather name="sun" size={24} color={theme.text} />
        ) : (
          <Feather name="moon" size={24} color={theme.text} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeleteAll}>
        <Text style={[styles.delete, { color: theme.text }]}>Delete All</Text>
      </TouchableOpacity>
    </View>
  );
}
