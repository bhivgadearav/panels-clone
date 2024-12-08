export interface Wallpaper {
    url: string;
    name: string;
}

export interface FullWallpaper extends Wallpaper {
    suggested: boolean;
    liked: boolean;
    library: boolean;
}

export function useLikedWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(w => w.liked);
}

export function useLibraryWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(w => w.library);
}

export function useSuggestedWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(w => w.suggested);
}

export default function useWallpapers(): FullWallpaper[] {
    return [
        {
            url: 'https://images8.alphacoders.com/100/thumb-1920-1006728.jpg',
            name: 'Anime W1',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://images2.alphacoders.com/508/508499.jpg',
            name: 'Anime W2',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://images5.alphacoders.com/131/1311994.jpeg',
            name: 'Anime W3',
            suggested: true,
            liked: true,
            library: true
        },
        {
            url: 'https://images2.alphacoders.com/824/82410.jpg',
            name: 'Anime W4',
            suggested: false,
            liked: true,
            library: true
        },
        {
            url: 'https://picfiles.alphacoders.com/364/364770.jpg',
            name: 'Anime W5',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://wallpapers.com/images/high/anime-lock-screen-noface-spirited-away-3yry052xmacifjfw.webp',
            name: 'Anime W6',
            suggested: false,
            liked: false,
            library: false
        },
        {
            url: 'https://images8.alphacoders.com/100/thumb-1920-1006728.jpg',
            name: 'Anime W7',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://images2.alphacoders.com/508/508499.jpg',
            name: 'Anime W8',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://images5.alphacoders.com/131/1311994.jpeg',
            name: 'Anime W9',
            suggested: true,
            liked: true,
            library: true
        },
        {
            url: 'https://images8.alphacoders.com/100/thumb-1920-1006728.jpg',
            name: 'Anime W10',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://images2.alphacoders.com/508/508499.jpg',
            name: 'Anime W12',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://images5.alphacoders.com/131/1311994.jpeg',
            name: 'Anime W13',
            suggested: true,
            liked: true,
            library: true
        },
        {
            url: 'https://images8.alphacoders.com/100/thumb-1920-1006728.jpg',
            name: 'Anime W14',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://images2.alphacoders.com/508/508499.jpg',
            name: 'Anime W15',
            suggested: true,
            liked: false,
            library: false
        },
        {
            url: 'https://images5.alphacoders.com/131/1311994.jpeg',
            name: 'Anime W16',
            suggested: true,
            liked: true,
            library: true
        },
    ]
}