import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../../env';


interface Produto {
  id: number;
  image: string;
  nome: string;
  preco: number;
  // Adicione outros campos conforme necessário
}

function ProductScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      listProdutos();
    }, [])
  );

  const listProdutos = async () => {
    try {
      setRefreshing(true);

      const response = await fetch(API_URL + `/api/v1/produtos/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      // Certifique-se de ajustar conforme a estrutura real da sua API
      setProdutos(data.data || data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEndReached = () => {
    if (!refreshing) {
      listProdutos();
    }
  };

  return (
    <View style={styles.container}>
      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/product/[id]",
                params: { id: item.id },
              }}
              asChild
            >
              <TouchableOpacity style={styles.productsItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productsImage}
                  resizeMode="contain"
                />
                <View style={styles.productsText}>
                  <Text style={styles.productsName}>{item.nome}</Text>
                  <Text style={styles.productsPrice}>R$ {item.preco}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={listProdutos}
        />
      ) : (
        <Text>Carregando produtos...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  productsItem: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    marginVertical: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  productsImage: {
    width: 125,
    height: 125,
    marginBottom: 10,
  },
  productsText: {
    alignItems: 'center',
  },
  productsName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  productsPrice: {
    fontSize: 14,
    color: 'green',
  },
});

export default ProductScreen;
