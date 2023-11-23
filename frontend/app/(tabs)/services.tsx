import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Link } from 'expo-router'


const services = [
  {
    id: '01',
    servico: 'Banho & Tosa',
    descricao: 'Seu pet sempre limpinho e bem cuidado.',
    image: require('../../assets/images/icon-services/service-banho.png')
  },
  {
    id: '02',
    servico: 'Veterinário',
    descricao: 'A saúde do seu melhor amigo em boas mãos.',
    image: require('../../assets/images/icon-services/service-vet.png')
  },
  {
    id: '03',
    servico: 'Pet Slitter',
    descricao: 'Um anjo vai até sua casa para cuidar do seu pet.',
    image: require('../../assets/images/icon-services/service-petsitter.png')
  },
  {
    id: '04',
    servico: 'Dog Walker',
    descricao: 'Passeios educativos para o seu pet ter mais qualidade de vida.',
    image: require('../../assets/images/icon-services/service-dogwalker.png')
  },
  {
    id: '05',
    servico: 'Adestramento',
    descricao: 'Um anjo ensina seu pet através de comandos e petiscos.',
    image: require('../../assets/images/icon-services/service-adestrador.png')
  },
]

export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={{
            pathname: "/service/[id]",
            params: { id: item.id, servico: item.servico, descricao: item.descricao  }
          }} asChild>
            <TouchableOpacity style={styles.servicesItem}>
                <View style={styles.serviceInfo}>
                  <Image
                    source={item.image}
                    style={styles.serviceImage}
                    resizeMode="cover"
                  />
                  <View style={styles.serviceText}>
                    <Text style={styles.serviceName}>{item.servico}</Text>
                    <Text style={styles.serviceDescricao}>{item.descricao}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  servicesItem: {
    backgroundColor: 'white',
    width: '90%',
    height: 100,
    paddingTop: 20,
    paddingLeft: 20,
    marginVertical: 15,
    marginHorizontal: 20,
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
  serviceInfo: {
    flexDirection: 'row', // Alinha os elementos horizontalmente
    alignItems: 'center', // Centraliza os elementos verticalmente
  },
  serviceImage: {
    width: 65,
    height: 65,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8, // Arredonda a borda inferior esquerda
  },
  serviceText: {
    flex: 1,
    paddingLeft: 16,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescricao: {
    fontSize: 14,
    marginTop: 4, // Espaçamento entre o nome e a descrição
  },
});
