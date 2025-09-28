import {View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';
import { useState } from 'react';

export default function register() {
    const router = useRouter(); 
    const {signUp} = useAuth();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdC, setPwdC] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async() => {
        try {
            if(!email.includes("@") || !email.includes(".com")) {
                Alert.alert("Erro!", " Digite um e-mail válido.");
                return;
            }

            if(pwd.length < 6){
                Alert.alert("Erro!", " A senha deve conter pelo menos 6 caracteres!!");
                return;
            }

            if(pwdC !== pwd){
                Alert.alert("Erro!", " As senha não coincidem!");
                return;
            }

            setLoading(true);

            await signUp(email.trim(), pwd);

            Alert.alert("","Cadastro realizado com sucesso!!");
            router.back();

        } catch (error: any) {
            Alert.alert("Error", error?.message ?? "Falha ao registrar.");
        } finally{
            setLoading(false);
        }
    }
    return(
<View className="flex-1 items-center justify-center bg-white px-6">
      <Stack.Screen options={{ title: 'Entrar', headerShown: true }} />
      <Text className="text-2xl font-bold mb-6">Registre-se</Text>

      <TextInput
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <View className="w-full border border-zinc-300 rounded-xl flex-row items-center px-4 py-3 mb-4">
      <TextInput
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Senha"
        secureTextEntry={!showPwd}
        value={pwd}
        onChangeText={setPwd}
      />

        <Pressable
        onPress={() => setShowPwd(!showPwd)}>
        <Text className='text-blue-600 font-semibold'>
            {showPwd ? "🙈" : "👁️"}
        </Text>
      </Pressable>
      </View>

      <View className="w-full border border-zinc-300 rounded-xl flex-row items-center px-4 py-3 mb-4">
      <TextInput
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Confirmar senha"
        secureTextEntry={!showPwd}
        value={pwdC}
        onChangeText={setPwdC}
      />

        <Pressable
        onPress={() => setShowPwd(!showPwd)}>
        <Text className='text-blue-600 font-semibold'>
            {showPwd ? "🙈" : "👁️"}
        </Text>
      </Pressable>
     </View>

      <Pressable
      onPress={() => router.back()}
      disabled={loading}
      className='w-full rounded-xl px-4 py-3 items-center justify-center bg-zinc-800 mt-3'
      >
        <Text className="text-white font-semibold">{loading ? 'Voltando...' : 'Voltar ao login'} </Text>
      </Pressable>
      
      <Pressable
      onPress={handleSignUp}
      disabled={loading}
      className="w-full rounded-xl px-4 py-3 items-center justify-center bg-blue-600 mt-3"
      >
        <Text className="text-white font-semibold">{loading ? 'Confirmando...' : 'Confirmar'}</Text>
      </Pressable>
    </View>
  );
}
