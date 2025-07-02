import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  text: string;
  onChangeText: (text: string) => void;
  theme: any;
  styles: any;
  category:string;
}

export default function InputBar({ visible,onClose,onSubmit,text,onChangeText,theme,category}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}>
        <View style={{
          width: '90%',
          backgroundColor: theme.bg,
          padding: 20,
          borderRadius: 12,
        }}>
          <Text style={{
            color: theme.text,
            fontSize: 18,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
            {`Add a ${category} Task`}
          </Text>

          <TextInput
            value={text}
            onChangeText={onChangeText}
            placeholder={category ? 'What do you need to do?' : 'Where do you want to go?'}
            placeholderTextColor={theme.placeholder}
            style={{
              backgroundColor: theme.toDoBg,
              color: theme.text,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              fontSize: 16,
            }}
            returnKeyType="done"
            onSubmitEditing={() => {
              onSubmit();
              setTimeout(() => onClose(),100); 
            }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{marginRight: 20 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              onSubmit();
              onClose();
            }}>
              <Text style={{ color: theme.text, fontWeight: '600' }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}