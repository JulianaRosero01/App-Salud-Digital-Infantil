import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Video1() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.youtube.com/embed/QAmKjeArXcU' }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
});
