import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../env';

const EditProdutoScreen = () => {
  const { id } = useGlobalSearchParams();
  const produtoId = Number(id);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [image, setImage] = useState('');
  const navigation = useRouter();

  useEffect(() => {
    if (produtoId) {
      carregarProduto();
    }
  }, [produtoId]);

  const carregarProduto = async () => {
    try {
      const response = await axios.get(API_URL + `/api/v1/produto/${produtoId}/`);
      const produto = response.data;

      setNome(produto.nome);
      setPreco(produto.preco.toString());
      setDescricao(produto.descricao);
      setImage(produto.image);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
    }
  };

  const excluirProduto = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        console.error('Token não encontrado em AsyncStorage.');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      };

      if (produtoId) {
        await axios.delete(API_URL + `/api/v1/produto/excluir/${produtoId}/`, { headers });
        console.log('Produto excluído com sucesso!');
        navigation.push("/(tabs)/products")
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const salvarProduto = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        console.error('Token não encontrado em AsyncStorage.');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      };

      let response;

      if (produtoId) {
        response = await axios.put(
          API_URL + `/api/v1/produto/editar/${produtoId}/`,
          {
            nome,
            preco: parseFloat(preco),
            descricao,
            image,
          },
          { headers }
        );
      } else {
        response = await axios.post(
          API_URL + `/api/v1/produtos/`,
          {
            nome,
            preco: parseFloat(preco),
            descricao,
            image,
          },
          { headers }
        );
      }

      console.log('Produto salvo:', response.data);
      // router.replace('/products');
      navigation.push("/(tabs)/products")
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
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

      {/* <Link href="/(tabs)/products" asChild> */}
        <Button title="Salvar Alterações" onPress={salvarProduto} />
      {/* </Link> */}

      <View style={styles.buttonDel}>
      <Button title="Excluir Produto" onPress={excluirProduto} color="red" />
      </View>
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
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonDel: {
    marginTop: 20,
  },
});

export default EditProdutoScreen;
