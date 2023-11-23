import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGlobalSearchParams, Link } from 'expo-router'
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { API_URL } from '../../env';


interface ProdutoType{descricao: string; id: number; image: string; nome: string; preco: number}


export default function ProductDetail() {
const [produto, setProduto] = useState<ProdutoType | null>(null);
const { id } = useGlobalSearchParams();
const productId = Number(id); // ou Number(id);
const [storedAdminUser, setIsAdminUser] = useState(false);


useEffect(() => {
  fetchProduto(productId);
  retrieveAdminUser();
}, []);

const retrieveAdminUser = async () => {
  try {
    const storedAdminUser = await AsyncStorage.getItem('isAdminUser');
    if (storedAdminUser !== null) {
      // Converte o valor armazenado para um booleano
      setIsAdminUser(storedAdminUser === 'true');
    }
  } catch (error) {
    console.error('Erro ao recuperar permissão de adm: ', error);
  }
};

async function fetchProduto(id: number) {
  try {
    const response = await fetch(API_URL + `/api/v1/produto/${id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 404) {
      console.error("Produto não encontrado");
      return;
    }
    const data = await response.json();
    setProduto(data); // Remova o .data, pois a resposta já é um array de objetos
  } catch (error) {
    console.error("Erro ao buscar o produto:", error);
  }
}


return (
  <View style={styles.container}>
    {produto && (
      <View>
        <Animatable.Image
          animation="flipInY"
          source={{ uri: produto.image }}
          style={styles.ImageProd}
          resizeMode="contain"
        />
        <Animatable.View animation="fadeInUp" delay={500} style={styles.cont3}>
          <Text style={styles.nameProd}>{produto.nome}</Text>
          <Text style={styles.descProd}>{produto.descricao}</Text>
          <Text style={styles.codProd}>Código: {produto.id}</Text>
          <Text style={styles.priceProd}>R$ {produto.preco}</Text>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Add to cart</Text>
          </TouchableOpacity>
          {storedAdminUser && (
            <Link
              href={{
                pathname: "/prodEdit/[id]",
                params: { id: productId },
              }}
              asChild
            >
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Editar Produto</Text>
              </TouchableOpacity>
            </Link>
          )}
        </Animatable.View>
      </View>
    )}
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#03bb85"
},
nameProd: {
  fontSize: 25,
  marginTop: 30,
  paddingLeft: 15,
  fontWeight: 'bold',

},
ImageProd: {
  width: 250,
  height: 250,
  marginBottom: 10,
  marginTop: 10,
  alignSelf: 'center',
  resizeMode: 'cover',
  maxWidth: '100%'
},
codProd: {
  fontSize: 20,
  color: "#474747",
  paddingLeft: 15,
  marginTop: 10,
},
priceProd: {
  fontSize: 20,
  paddingRight: 80,
  paddingLeft: 15,
  lineHeight: 25,
  marginTop: 15,
  marginBottom: 20,
},
descProd: {
  fontSize: 20,
  paddingRight: 50,
  paddingLeft: 15,
  lineHeight: 25,
  marginTop: 15
},
btn: {
  backgroundColor: "#03bb85",
  width: 350,
  borderRadius: 15,
  paddingVertical: 8,
  marginTop: 15,
  justifyContent: 'center',
  alignItems: 'center'
},
btnText: {
  color: "#FFF",
  fontSize: 18,
  fontWeight: 'bold'
},
c3: {
  height: 20,
  width: 20,
  borderRadius: 15,
  backgroundColor: "#529CC0",
},
c2: {
  height: 20,
  width: 20,
  borderRadius: 15,
  backgroundColor: "#529C47",
  marginHorizontal:10
},
c1: {
  height: 20,
  width: 20,
  borderRadius: 15,
  backgroundColor: "#E2443B",
},
selected: {
  borderColor: "#E2443B",
  height: 30,
  width: 30,
  borderRadius: 24,
  borderWidth: 2,
  alignItems: "center",
  justifyContent: "center",
},
cont2: {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  marginVertical: 25,
},
cont3: {
  flex: 1,
  backgroundColor: 'white',
  width: "100%",
  paddingHorizontal: 20,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
},
});