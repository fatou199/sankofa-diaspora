import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';
import {
    Search,
    Plane,
    Languages,
    Users,
    Calendar,
    ArrowRight
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ACTION_CARDS = [
    { icon: <Plane size={24} color="#10b981" />, title: 'Planifier un voyage' },
    { icon: <Languages size={24} color="#10b981" />, title: 'Apprendre une langue' },
    { icon: <Users size={24} color="#10b981" />, title: 'Communauté' },
    { icon: <Calendar size={24} color="#10b981" />, title: 'Événements' },
];

const DESTINATIONS = [
    {
        id: '1',
        name: 'Sénégal',
        desc: 'Terre de la Teranga',
        image: 'https://images.unsplash.com/photo-1596701062351-be4f6a45559c?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'Kenya',
        desc: 'Le berceau de...',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=400&auto=format&fit=crop',
    }
];

const API_URL = 'http://192.168.1.143:3000/api';

export default function Home2() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/countries`)
            .then(res => res.json())
            .then(data => setDestinations(data))
            .catch(err => console.error("Erreur backend V2:", err));
    }, []);

    return (
        <View className="flex-1 bg-[#050f05]">
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Hero Section with Baobabs */}
                <View className="h-[500px] w-full relative">
                    <Image
                        source={require('../../assets/images/hero2.png')}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['rgba(5, 15, 5, 0.4)', 'rgba(5, 15, 5, 0.8)', '#050f05']}
                        className="absolute inset-0"
                    />
                    <View className="absolute bottom-8 left-5 right-5">
                        <Text className="text-[#10b981] text-xs font-black tracking-widest mb-2.5">BIENVENUE CHEZ VOUS</Text>
                        <Text className="text-white text-4xl font-black leading-12 mb-6">
                            Reconnectez avec{"\n"}vos racines
                        </Text>

                        <View className="flex-row items-center bg-white/5 rounded-2xl px-5 py-4.5 border border-white/10">
                            <Search size={20} color="rgba(255,255,255,0.3)" className="mr-2.5" />
                            <Text className="text-white/30 text-sm">Rechercher un pays, une culture...</Text>
                        </View>
                    </View>
                </View>

                {/* Quick Actions Grid */}
                <View className="flex-row flex-wrap p-2.5 gap-2.5">
                    {ACTION_CARDS.map((card, i) => (
                        <TouchableOpacity key={i} className="bg-white/3 rounded-3xl p-5 border border-white/5 h-[140px] justify-between" style={{ width: (width - 30) / 2 }}>
                            <View className="w-11 h-11 rounded-xl bg-[#10b981]/10 items-center justify-center">
                                {card.icon}
                            </View>
                            <Text className="text-white text-sm font-semibold leading-5">{card.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Destinations Populaires */}
                <View className="mt-10 px-5">
                    <View className="flex-row items-center justify-between mb-5">
                        <Text className="text-white text-2xl font-black">Destinations Populaires</Text>
                        <TouchableOpacity>
                            <Text className="text-[#10b981] text-sm font-bold">Voir tout</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                        {destinations.length > 0 ? destinations.map((dest) => (
                            <TouchableOpacity key={dest.id} className="w-[260px] h-[350px] mr-4 rounded-[30px] overflow-hidden relative" style={{ width: width * 0.65 }}>
                                <Image source={{ uri: dest.image || 'https://images.unsplash.com/photo-1596701062351-be4f6a45559c?q=80&w=600&auto=format&fit=crop' }} className="w-full h-full" />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-[150px]"
                                />
                                <View className="absolute bottom-6 left-6">
                                    <Text className="text-white text-2xl font-black mb-1">{dest.nom}</Text>
                                    <Text className="text-[#10b981] text-[13px] font-semibold">{dest.capitale || 'Ville'}</Text>
                                </View>
                            </TouchableOpacity>
                        )) : (
                            <View className="h-[350px] w-[300px] items-center justify-center">
                                <Text className="text-white/20">Chargement...</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>

                {/* Histoires de la Diaspora */}
                <View className="mt-10 px-5">
                    <Text className="text-white text-2xl font-black mb-5">Histoires de la Diaspora</Text>
                    <View className="flex-row bg-white/3 rounded-[25px] p-5 mb-4 gap-5 border-l-4 border-[#10b981]">
                        <Image source={{ uri: 'https://i.pravatar.cc/150?u=amarak' }} className="w-[50px] h-[50px] rounded-full" />
                        <View className="flex-1 gap-1.5">
                            <Text className="text-white text-base font-bold">Amara K.</Text>
                            <Text className="text-white/50 text-[13px] italic leading-4.5" numberOfLines={3}>
                                "Mon retour au Bénin a changé ma vision du monde. Retrouver le village de mes..."
                            </Text>
                            <Text className="text-[#10b981] text-[11px] font-black mt-1">LIRE LA SUITE</Text>
                        </View>
                    </View>

                    <View className="flex-row bg-white/3 rounded-[25px] p-5 mb-4 gap-5 border-l-4 border-[#10b981]">
                        <Image source={{ uri: 'https://i.pravatar.cc/150?u=fatoud' }} className="w-[50px] h-[50px] rounded-full" />
                        <View className="flex-1 gap-1.5">
                            <Text className="text-white text-base font-bold">Fatou D.</Text>
                            <Text className="text-white/50 text-[13px] italic leading-4.5" numberOfLines={3}>
                                "Grâce à la communauté, j'ai pu retracer l'histoire de ma famille jusqu'au Mali. Une..."
                            </Text>
                            <Text className="text-[#10b981] text-[11px] font-black mt-1">LIRE LA SUITE</Text>
                        </View>
                    </View>
                </View>

                {/* CTA Button */}
                <View className="px-5 mt-10 items-center">
                    <TouchableOpacity className="w-full bg-[#10b981] h-16 rounded-2xl flex-row items-center justify-center gap-3 shadow-lg shadow-[#10b981]/30">
                        <Text className="text-black text-lg font-black">Commencer mon voyage</Text>
                        <ArrowRight size={20} color="black" />
                    </TouchableOpacity>
                    <Text className="text-white/30 text-xs mt-4 italic">Rejoignez plus de 50,000 membres de la diaspora.</Text>
                </View>

                <View className="h-40" />
            </ScrollView>
        </View>
    );
}
