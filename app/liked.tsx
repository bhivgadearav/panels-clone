import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { SplitView } from "@/components/SplitView";
import useWallpapers, { useSuggestedWallpapers, Wallpaper } from "@/hooks/useWallpapers";
import DownloadPicture from "@/components/BottomSheet";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

export default function Liked(){
    const wallpapers = useWallpapers();
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null)
    return <ThemedSafeAreaView style={styles.container}>
        <ThemedView style={styles.container}>
            <ScrollView>
                <SplitView setSelectedWallpaper={setSelectedWallpaper} wallpapers={wallpapers} />
            </ScrollView>
            {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
        </ThemedView>
    </ThemedSafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})