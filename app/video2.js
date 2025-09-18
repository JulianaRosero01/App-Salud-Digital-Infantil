import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Video2() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.youtube.com/embed/evqoJsud5Cg' }}
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
