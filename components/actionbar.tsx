import { View, TouchableOpacity, Text } from 'react-native';


interface Props {
  onDeleteAll: () => void;
  theme: any;
  styles: any;
}

export default function ActionBar({  onDeleteAll, theme, styles }: Props) {
  return (
    <View style={styles.mid}>
      <TouchableOpacity onPress={onDeleteAll}>
        <Text style={[styles.delete, { color: theme.text }]}>Delete All</Text>
      </TouchableOpacity>
    </View>
  );
}
