import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
    marginBottom:20
  },
  btn: {
    fontSize: 30,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  mid: {
    alignItems: 'flex-end',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  toDo: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  toDoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  delete: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 15,
    paddingRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkmark: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  progressWrapper: {
  marginTop: 20,
  marginBottom: 10,
  paddingHorizontal: 20,
  },
progressText: {
  fontSize: 14,
  marginBottom: 6,
},
progressBarBackground: {
  height: 6,
  borderRadius: 3,
  overflow: 'hidden',
},
progressBarFill: {
  height: 6,
  borderRadius: 3,
},
add: {
  position: 'absolute',
  bottom: 70,
  alignSelf: 'center',
  width: 50,
  height: 50,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 10,
  zIndex: 10,
},
});