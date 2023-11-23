import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../env';


const CadastroProdutoScreen = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [image, setImage] = useState('');
  const navigation = useRouter();


  const criarProduto = async () => {
    try {
      // Obtenha o token armazenado em AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      const userAdmin = await AsyncStorage.getItem('isAdminUser');
  
      // Verifique se o token está presente
      if (token) {
        // Configure o cabeçalho da solicitação com o token
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        };
  
        // Enviar os dados para a API Django com o token no cabeçalho
        const response = await axios.post(API_URL + `/api/v1/produtos/`, {
          nome,
          preco,
          descricao,
          image,
        }, { headers });
  
        console.log('Produto criado:', response.data);
        navigation.push("/(tabs)/products")
      } else {
        console.error('Token não encontrado em AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={(text) => setNome(text)}
        placeholder="Digite o nome do produto"
      />

      <Text style={styles.label}>Preço:</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={(text) => setPreco(text)}
        placeholder="Digite o preço do produto"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
        placeholder="Digite a descrição do produto"
      />

      <Text style={styles.label}>URL da Imagem:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={(text) => setImage(text)}
        placeholder="Digite a URL da imagem do produto"
      />

      <Button title="Criar Produto" onPress={criarProduto} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CadastroProdutoScreen;
