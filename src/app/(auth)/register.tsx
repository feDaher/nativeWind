import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Stack, router } from 'expo-router';
import uuid from 'react-native-uuid';

export default function Register() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Validações
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) => password.length >= 6;
  const unmaskCPF = (cpf:string) => cpf.replace(/\D/g, '');
  const formatCPF = (value:string) => {
    const v = unmaskCPF(value).slice(0,11);
    return v
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1.$2')
  };
  const validateCpf = (cpf:string) => unmaskCPF(cpf).length === 11;

  const handleRegister = async () => {
    if (!username.trim() || !fullName.trim())
      return Alert.alert('Erro', 'Preencha todos os campos');
    if (!validateEmail(email)) return Alert.alert('Erro', 'E-mail inválido');
    if (!validateCpf(cpf)) return Alert.alert('Erro', 'CPF deve ter 11 números');
    if (!validatePassword(password))
      return Alert.alert('Erro', 'Senha deve ter ao menos 6 caracteres');
    if (password !== confirmPassword)
      return Alert.alert('Erro', 'Senhas não coincidem');

    setLoading(true);

    try {
      const safeKey = `user_${email.trim().replace(/[^a-zA-Z0-9]/g, '')}`;
      const user = { 
        id: uuid.v4() as string, 
        username, 
        fullName, 
        cpf: unmaskCPF(cpf), 
        email, 
        password 
      };

      // Salva os dados do usuário
      await SecureStore.setItemAsync(safeKey, JSON.stringify(user));

      // Salva a sessão com o e-mail do usuário logado
      await SecureStore.setItemAsync("session", JSON.stringify({ email }));

      Alert.alert('Sucesso', 'Cadastro concluído!');
      router.replace('(auth)/login');
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Falha ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Stack.Screen options={{ title: 'Cadastro', headerShown: true }} />
      <Text className="text-2xl font-bold mb-6">Cadastro</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
      />
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
      />
      <TextInput
        placeholder="CPF"
        keyboardType="numeric"
        maxLength={14}
        value={cpf}
        onChangeText={(text) => setCpf(formatCPF(text))}
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
      />
      <TextInput
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
      />
      <TextInput
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
      />

      <Pressable
        onPress={handleRegister}
        disabled={loading}
        className="w-full rounded-xl px-4 py-3 items-center justify-center bg-zinc-800 mb-3"
      >
        <Text className="text-white font-semibold">
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.replace('(auth)/login')}
        className="w-full rounded-xl px-4 py-3 items-center justify-center border border-zinc-800"
      >
        <Text className="text-zinc-800 font-semibold">Voltar para Login</Text>
      </Pressable>
    </View>
  );
}
