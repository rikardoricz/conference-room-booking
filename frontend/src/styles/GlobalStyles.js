import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontFamily: "Lato_400Regular",
  },
  body: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
  cardDesc: {
    fontSize: 14,
    fontFamily: "Lato_400Regular",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Lato_500Medium",
  },
  boldText: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
  },
  pickerContainer: {
    backgroundColor: '#D8ECF8',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    width: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  pickerValue: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerModal: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  numberItem: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  numberText: {
    fontSize: 18,
    color: '#333',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

