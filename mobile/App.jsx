import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {
  Compass,
  Users,
  User,
  Sparkles,
  Bell,
  Layout
} from 'lucide-react-native';
import Home1 from './src/screens/Home1';
import Home2 from './src/screens/Home2';

export default function App() {
  const [activeVersion, setActiveVersion] = useState(1);

  return (
    <View className="flex-1 bg-[#0b0d09]">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Absolute Header to allow image bleed */}
      <View
        className="absolute top-0 left-0 right-0 z-[100]"
        style={{
          backgroundColor: activeVersion === 1 ? 'rgba(11, 13, 9, 0.4)' : '#050f05',
          paddingTop: StatusBar.currentHeight || 50
        }}
      >
        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="flex-row items-center gap-2">
            {activeVersion === 1 ? (
              <>
                <Sparkles size={20} color="#d4a373" strokeWidth={2.5} />
                <Text className="text-white text-lg font-black tracking-tight">Héritage & Racines</Text>
              </>
            ) : (
              <>
                <View className="w-8 h-8 bg-[#10b981] rounded-lg items-center justify-center">
                  <Sparkles size={16} color="white" fill="white" />
                </View>
                <Text className="text-white text-lg font-black tracking-widest uppercase">HÉRITAGE</Text>
              </>
            )}
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => setActiveVersion(activeVersion === 1 ? 2 : 1)}
              className="flex-row items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded-xl underline"
            >
              <Layout size={18} color={activeVersion === 1 ? "#d4a373" : "#10b981"} />
              <Text style={{ color: activeVersion === 1 ? "#d4a373" : "#10b981" }} className="text-xs font-black">
                V{activeVersion}
              </Text>
            </TouchableOpacity>

            {activeVersion === 2 && (
              <TouchableOpacity className="mr-1">
                <Bell size={20} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="w-9 h-9 rounded-full bg-white/10 items-center justify-center border"
              style={{ borderColor: activeVersion === 1 ? 'rgba(212, 163, 115, 0.3)' : 'rgba(255,255,255,0.1)' }}
            >
              <User size={20} color={activeVersion === 1 ? "#d4a373" : "white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Render Active Version */}
      <View className="flex-1">
        {activeVersion === 1 ? <Home1 /> : <Home2 />}
      </View>

      {/* Bottom Navigation */}
      <View
        className="absolute bottom-0 left-0 right-0 h-[90px] border-t border-white/5 flex-row justify-around pt-2.5 pb-6"
        style={{ backgroundColor: activeVersion === 1 ? '#0b0d09' : '#050f05' }}
      >
        <TouchableOpacity className="items-center gap-1">
          <Compass size={24} color={activeVersion === 1 ? "#d4a373" : "#10b981"} />
          <Text style={{ color: activeVersion === 1 ? "#d4a373" : "#10b981" }} className="text-[9px] font-black uppercase">ACCUEIL</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center gap-1 opacity-40">
          <Compass size={24} color="white" />
          <Text className="text-white text-[9px] font-black uppercase">EXPLORER</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center gap-1 opacity-40">
          <Users size={24} color="white" />
          <Text className="text-white text-[9px] font-black uppercase">COMMUNAUTÉ</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center gap-1 opacity-40">
          <User size={24} color="white" />
          <Text className="text-white text-[9px] font-black uppercase">PROFIL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
