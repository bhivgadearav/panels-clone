import { StyleSheet, Dimensions, Text, View, Image } from "react-native";
import useWallpapers, { Wallpaper } from "@/hooks/useWallpapers";
import { SplitView } from "@/components/SplitView";
import Carousel from 'react-native-reanimated-carousel';
import { useCallback, useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { LinearGradient } from 'expo-linear-gradient';
import ParallaxScrollView from "@/components/ParallaxScrollView";
import DownloadPicture from "@/components/BottomSheet";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

const TOPBAR_HEIGHT = 250;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Explore() {
    const wallpapers = useWallpapers();
    const carouselItems = useCarousel();
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null)

    // Memoized render item for performance
    const renderCarouselItem = useCallback(({ index }: any) => (
      <>
        <View style={styles.carouselItemContainer}>
          <Image 
            source={{uri: carouselItems[index].image}} 
            style={styles.carouselImage} 
            resizeMode="cover"
          />
        </View>

        <LinearGradient 
          colors={['transparent', 'black']} 
          style={styles.gradientOverlay}
        >
            <Text style={styles.carouselTitle}>
                {carouselItems[index].title}
            </Text>
        </LinearGradient>
      </>
    ), [carouselItems]);

    return (
        <>
            <ParallaxScrollView
            headerImage={
                <Carousel
                    width={SCREEN_WIDTH}
                    data={carouselItems}
                    renderItem={renderCarouselItem}
                    autoPlay={true}
                    scrollAnimationDuration={1100}
                    panGestureHandlerProps={{
                    activeOffsetX: [-10, 10], // Reduce sensitivity to horizontal scrolling
                    }}
                    // Improve performance with these props
                    windowSize={3}
                />
            }
            headerBackgroundColor={{ light: 'white', dark: 'black' }}
            >
                <SplitView wallpapers={wallpapers} setSelectedWallpaper={setSelectedWallpaper} />
            </ParallaxScrollView>
            {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    carouselItemContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    carouselImage: {
        height: TOPBAR_HEIGHT,
        width: '100%',
    },
    gradientOverlay: {
        position: "absolute", 
        zIndex: 10, 
        height: TOPBAR_HEIGHT / 2, 
        width: "100%", 
        bottom: 0
    },
    carouselTitle: {
        color: "white", 
        paddingTop: TOPBAR_HEIGHT / 3, 
        textAlign: "center", 
        fontSize: 20, 
        fontWeight: "600"
    },
    splitViewContainer: {
        borderRadius: 20,
    },
});