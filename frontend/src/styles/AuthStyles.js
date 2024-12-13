import { StyleSheet } from 'react-native'

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 15
  },
  primaryButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  signupContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 15,
  },
  signupText: {
    color: 'black',
    marginRight: 5, 
  },
  signupLinkText: {
    color: '#007bff',
    fontWeight: 'bold',
  }
})

