import { View, Text, StyleSheet } from "react-native";

interface Data {
  data: {
    id: string,
    name: string,
    amount: string
  }
}

export default function Ingredients({ data }: Data){
  return(
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text>{data.amount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 4,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
  }
})