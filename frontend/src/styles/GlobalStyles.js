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
    shadowOffset: { width: 0, height: 2 },
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
})

