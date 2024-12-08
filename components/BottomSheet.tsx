import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, useColorScheme, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpapers';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors";
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { withTiming } from 'react-native-reanimated';

enum DownloadButtonText {
  Download = "Download",
  Downloaded = "Downloaded",
  Downloading = "Downloading"
}

function wait(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function DownloadButton({ url }: { url: string }) {
  const theme = useColorScheme() ?? 'light';
  const [buttonText, setButtonText] = React.useState<DownloadButtonText>(DownloadButtonText.Download);
  return (
    <Pressable 
    onPress={async () => {
      let date = new Date().getTime();
      let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
      try {
          const response = await MediaLibrary.requestPermissionsAsync();
          setButtonText(DownloadButtonText.Downloading)
          if (response.granted) {
            MediaLibrary.createAssetAsync(fileUri)
            const downloaded = await FileSystem.downloadAsync(url, fileUri);
            const asset = await MediaLibrary.createAssetAsync(downloaded.uri);
            setButtonText(DownloadButtonText.Downloaded)
            await wait(2000)
            setButtonText(DownloadButtonText.Downloaded)
          } else {
            alert('Permission required to save image')
          }
      } catch (err) {
          console.log("FS Err: ", err)
      }
    }}
    style={{
      backgroundColor: 'black',
      padding: 10,
      margin: 20,
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      marginHorizontal: 40,
      marginVertical: 20,
    }}>
      <Ionicons
        name={'download'}
        size={24}
        style={{ marginRight: 10 }}
        color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      <Text style={{
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
      }}>
        {buttonText}
      </Text>
    </Pressable>
  )
}

export const DownloadPicture = ({ onClose, wallpaper}: {
  onClose: () => void;
  wallpaper: Wallpaper;
}) => {
// ref
const bottomSheetRef = useRef<BottomSheet>(null);
const theme = useColorScheme() ?? 'light';

// callbacks
const handleSheetChanges = useCallback((index: number) => {
  // console.log('handleSheetChanges', index);
}, []);

// renders
return (
  <BottomSheet
    onClose={onClose}
    snapPoints={["100%"]}
    ref={bottomSheetRef}
    onChange={handleSheetChanges}
    backgroundStyle={{ backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }}
    enablePanDownToClose={true}
    handleIndicatorStyle={{ display: "none" }}
    handleStyle={{ display: "none" }}
  >
    <BottomSheetView style={styles.contentContainer}>
      <ThemedView style={{flex: 1}}>
        <Image style={styles.image} source={{uri: wallpaper.url}} />
        <View style={styles.topbar}>
          <Ionicons
              onPress={() => {
                bottomSheetRef.current?.close();
                setTimeout(onClose, 300); // Delay the onClose callback for smooth closing
              }}
              name='close-circle'
              size={40}
              color={theme === 'light' ? Colors.light.icon : Colors.dark.text}
          />
          <View style={styles.topbarInner}>
            <Ionicons
          name='heart-circle'
          size={40}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.text}
            />
            <Ionicons
          name={'arrow-redo-circle-sharp'}
          size={40}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.text}
          style={{paddingLeft: 4}}
            />
          </View>
        </View>
        <ThemedView style={styles.textContainer}>
          <ThemedText style={styles.text}>{wallpaper.name}</ThemedText>
        </ThemedView>
        <DownloadButton url={wallpaper.url} />
      </ThemedView>
    </BottomSheetView>
  </BottomSheet>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    height: "70%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topbar: {
    position: "absolute",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%"
  },
  topbarInner: {
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    width: "100%"
  },
  text: {
    paddingTop: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600"
  }
});

export default DownloadPicture;