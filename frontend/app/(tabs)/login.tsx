import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../env';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen() {
  const navigation = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [storedUsername, setStoredUsername] = useState('');
  const [storedAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    retrieveStoredUsername();
    retrieveAdminUser();
  }, []);

  const retrieveAdminUser = async () => {
    try {
      const storedAdminUser = await AsyncStorage.getItem('isAdminUser');
      if (storedAdminUser !== null) {
        setIsAdminUser(storedAdminUser === 'true');
      }
    } catch (error) {
      console.error('Erro ao recuperar permissão de adm: ', error);
    }
  };

  const retrieveStoredUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('getUsername');
      if (storedUsername) {
        setStoredUsername(storedUsername);
      }
    } catch (error) {
      console.error('Erro ao recuperar o nome de usuário:', error);
    }
  };

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setAuthenticated(!!token);
  };

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      try {
        const response = await fetch(API_URL + `/api/v1/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const { token, isAdminUser } = data;
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('isAdminUser', isAdminUser.toString());
          await AsyncStorage.setItem('getUsername', username);
          setIsAdminUser(isAdminUser);
          setStoredUsername(username);
          setAuthenticated(true);
        } else {
          console.error('Erro ao fazer login:', data);
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja sair?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        { text: 'Sair', onPress: handleLogoutConfirmed },
      ],
      { cancelable: false }
    );
  };

  const handleLogoutConfirmed = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('isAdminUser');
      await AsyncStorage.removeItem('getUsername');
      setAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleCadastrarProduto = () => {
    try {
      navigation.push("/cad_produto");
    } catch (error) {
      console.error('Erro ir para a página', error);
    }
  };

  if (authenticated) {
    return (
      <View style={styles.container}>
        <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Bem-vindo(a) {storedUsername}</Text>
        </Animatable.View>
    
        <Animatable.View animation='fadeInUp' style={styles.containerForm}>
        <View style={styles.bottomButtonsContainer}>
            {storedAdminUser && (
              <TouchableOpacity style={styles.button} onPress={handleCadastrarProduto}>
                <Icon name="plus-circle" size={20} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Cadastrar Produto</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Icon name="sign-out" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Sair da conta</Text>
            </TouchableOpacity>
          </View>

        </Animatable.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' style={styles.containerForm}>
        <Text style={styles.title}>Username</Text>
        <TextInput
          placeholder='Digite seu username...'
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Sua senha'
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <Link href="/cadastro" asChild>
          <TouchableOpacity style={styles.buttonRegister}>
            <Text style={styles.registerText}>Não possui uma conta? Cadastre-se!</Text>
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
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
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
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: '5%',
    paddingBottom: '10%',
  },
  button: {
    backgroundColor: "#03bb85",
    width: '100%',
    borderRadius: 15,
    paddingVertical: 12,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1'
  },
  buttonIcon: {
    marginRight: 8,
  },
});
