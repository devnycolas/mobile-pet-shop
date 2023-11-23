import {
    View,
    Text,
    Image,
    StyleSheet,
  } from 'react-native';

import { useGlobalSearchParams } from 'expo-router'



export default function ServiceDetail() {
    const { id, servico, descricao } = useGlobalSearchParams();


  return (
    

    <View style={styles.container}>
        <Text style={styles.title}>Produto ID: {id}</Text>
        <Text style={styles.title}>Serviço: {servico}</Text>
        <Text style={styles.title}>Descrição: {descricao}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fotoItem:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImage: {
    width: '60%',
    height: 200, // Altura da imagem
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
