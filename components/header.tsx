import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  working: boolean;
  work: () => void;
  travel: () => void;
  theme: any;
  styles: any;
}

export default function Header({ working, work, travel, theme, styles }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={work}>
        <Text style={[styles.btn, { color: working ? theme.text : theme.grey }]}>Work</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={travel}>
        <Text style={[styles.btn, { color: working ? theme.grey : theme.text }]}>Travel</Text>
      </TouchableOpacity>
    </View>
  );
}
