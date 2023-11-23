import React, { useState } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { Link, useRouter } from 'expo-router';
import { API_URL } from '../env';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Novo estado para o campo username
  const navigation = useRouter();


  const handleCadastro = () => {
    if (email.trim() === '' || password.trim() === '' || username.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      fetch(API_URL + `/api/v1/cadastro-usuario/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username, // Inclua o campo username no corpo da solicitação
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Usuário cadastrado:', data);
          navigation.push("/(tabs)/login")
        })
        .catch(error => {
          console.error('Erro ao cadastrar usuário:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastre-se</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' style={styles.containerForm}>
        <Text style={styles.title}>Username</Text>
        <TextInput
          placeholder='Digite um username...'
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder='Digite um e-mail...'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Sua senha'
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.buttonRegister}>
            <Text style={styles.registerText}>Voltar para a página inicial</Text>
          </TouchableOpacity>
        </Link>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03bb85"
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%'
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRigthRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#03bb85",
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1'
  }
})