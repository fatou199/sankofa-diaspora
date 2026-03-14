import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    styled
} from 'react-native';
import { useState, useEffect } from 'react';
import {
    Users,
    ChevronRight,
    Play
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// NativeWind makes components accept className
// You can use the `styled` HOC or just use className with standard components if using the plugin
// Tailwind classes are translated to React Native styles automatically

const DESTINATIONS = [
    {
        id: '1',
        name: 'Sénégal',
        sub: 'Gorée & Dakar',
        image: 'https://images.unsplash.com/photo-1596701062351-be4f6a45559c?q=80&w=400&auto=format&fit=crop',
        tag: 'HERITAGE'
    },
    {
        id: '2',
        name: 'Kenya',
        sub: 'Nairobi & Masai Mara',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'Éthiopie',
        sub: 'Lalibela & ...',
        image: 'https://images.unsplash.com/photo-1547035378-019688b77626?q=80&w=400&auto=format&fit=crop',
    }
];

const STORIES = [
    {
        id: '1',
        name: 'Amina, 28 ans',
        text: '"Ma première visite au Ghana a changé ma perception de moi-même..."',
        avatar: 'https://i.pravatar.cc/150?u=amina'
    },
    {
        id: '2',
        name: 'Kofi, 34 ans',
        text: '"Retrouver la terre de mes ancêtres au Bénin fut une révélation."',
        avatar: 'https://i.pravatar.cc/150?u=kofi'
    }
];

const API_URL = 'http://192.168.1.143:3000/api';

export default function Home1() {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/countries`)
            .then(res => res.json())
            .then(data => {
                setDestinations(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur backend:", err);
                setLoading(false);
            });
    }, []);

    return (
        <View className="flex-1 bg-[#0b0d09]">
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

                {/* Hero Section - Edge to Edge */}
                <View style={{ height: height * 0.75 }} className="w-full relative bg-[#0b0d09]">
                    <Image
                        source={require('../../assets/images/hero_v1.png')}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['rgba(11, 13, 9, 0.4)', 'transparent', 'rgba(11, 13, 9, 0.8)', '#0b0d09']}
                        className="absolute inset-0"
                    />
                    <View className="absolute bottom-10 left-5 right-5">
                        <Text className="text-white text-4xl font-black leading-10 mb-3">
                            Redécouvrez vos <Text className="text-primary">origines.</Text>
                        </Text>
                        <Text className="text-white/70 text-base font-medium leading-6 mb-7">
                            Un voyage au cœur de votre histoire{"\n"}et de vos racines africaines.
                        </Text>

                        <View className="bg-white/10 rounded-xl px-4 py-4 border border-white/10">
                            <Text className="text-white/50 text-sm">Où vos racines vous appellent-elles ?</Text>
                        </View>
                    </View>
                </View>

                {/* Destinations populaires */}
                <View className="mt-8 px-5">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-white text-xl font-bold">Destinations populaires</Text>
                        <TouchableOpacity className="flex-row items-center gap-1">
                            <Text className="text-primary text-sm font-semibold">Voir tout</Text>
                            <ChevronRight size={14} color="#d4a373" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 20 }}
                    >
                        {destinations.length > 0 ? destinations.map((dest) => (
                            <TouchableOpacity key={dest.id} className="w-[150px] mr-4">
                                <Image source={{ uri: dest.image || 'https://images.unsplash.com/photo-1596701062351-be4f6a45559c?q=80&w=400&auto=format&fit=crop' }} className="w-full h-[180px] rounded-2xl mb-2 bg-zinc-900" />
                                <View className="absolute top-2.5 left-2.5 bg-primary px-2 py-1 rounded-md">
                                    <Text className="text-black text-[10px] font-extrabold uppercase">{dest.code_iso || 'AFR'}</Text>
                                </View>
                                <View>
                                    <Text className="text-white text-base font-bold">{dest.nom}</Text>
                                    <Text className="text-white/50 text-xs">{dest.capitale || 'Ville'}</Text>
                                </View>
                            </TouchableOpacity>
                        )) : (
                            <View className="h-[180px] w-[300px] flex-row items-center justify-center">
                                <Text className="text-white/20 italic">Chargement...</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>

                {/* Promo Card */}
                <View className="mt-8 px-5">
                    <LinearGradient
                        colors={['#fca311', '#ffb703', '#e67e22']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="rounded-3xl p-6 relative overflow-hidden"
                    >
                        <Text className="text-[#0b0d09] text-2xl font-black leading-7 mb-2.5">
                            Prêt à tracer{"\n"}votre propre chemin ?
                        </Text>
                        <Text className="text-black/60 text-sm leading-5 mb-5 max-w-[80%]">
                            Découvrez notre outil de planification de voyage personnalisé pour la diaspora.
                        </Text>
                        <TouchableOpacity className="bg-[#0b0d09] flex-row items-center self-start px-4 py-2.5 rounded-xl gap-2">
                            <Text className="text-white text-sm font-bold">Commencer mon voyage</Text>
                            <Play size={14} color="white" fill="white" />
                        </TouchableOpacity>

                        <View className="absolute -bottom-2 -right-2 opacity-20">
                            <Users size={80} color="rgba(0,0,0,0.2)" />
                        </View>
                    </LinearGradient>
                </View>

                {/* Histoires de retour */}
                <View className="mt-8 px-5 mb-40">
                    <Text className="text-white text-xl font-bold">Histoires de retour</Text>
                    {STORIES.map((story) => (
                        <TouchableOpacity key={story.id} className="flex-row bg-white/5 rounded-2xl p-4 mt-4 items-center gap-4">
                            <Image source={{ uri: story.avatar }} className="w-[60px] h-[60px] rounded-2xl" />
                            <View className="flex-1">
                                <Text className="text-white text-base font-bold">{story.name}</Text>
                                <Text className="text-white/60 text-[13px] italic leading-4" numberOfLines={2}>
                                    {story.text}
                                </Text>
                                <Text className="text-primary text-xs font-bold mt-1">Lire son parcours</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
