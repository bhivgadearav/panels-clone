import { Wallpaper } from "@/hooks/useWallpapers"
import { ThemedView } from "./ThemedView"
import { View, StyleSheet, FlatList } from "react-native"
import ImageCard from "./ImageCard"
import { useState } from "react"
import { DownloadPicture } from "./BottomSheet"

export function SplitView({wallpapers, setSelectedWallpaper}: {
    wallpapers: Wallpaper[];
    setSelectedWallpaper: (wallpaper: Wallpaper) => void;
}) {
 
    return <>
            <FlatList
                scrollEnabled={false}
                data={wallpapers}
                renderItem={({item}) => <ThemedView style={styles.container}>
                    <ThemedView style={styles.innerContainer}>
                        <View style={styles.imageContainer}><ImageCard onPress={() => {
                            setSelectedWallpaper(item)
                        }} wallpaper={item} /></View>
                    </ThemedView>
                </ThemedView>
                
                }
                keyExtractor={item => item.name}
                numColumns={2}
            />
    </>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 10
    },
    imageContainer: {
        paddingVertical: 10
    }
})
