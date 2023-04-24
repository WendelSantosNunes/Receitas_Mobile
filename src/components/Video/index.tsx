import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons'

interface Data {
  handleClose: () => void,
  videoUrl: string,
}

export function VideoView({handleClose, videoUrl }: Data) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleClose}
      >
        <Feather name='arrow-left' size={24} color='#fff' />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <WebView
        style={styles.contentView}
        source={{ uri: videoUrl }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#4CBE6C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 14,
  },
  backText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 14,
  },
  contentView: {
    flex: 1,
    width: '100%',
  }
})