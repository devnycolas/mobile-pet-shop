import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { Link } from 'expo-router'

export default function indexScreen() {
  
  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Animatable.Image
        animation="flipInY"
        source={require('../assets/images/logo.png')}
        style={{ width: '80%'}}
        resizeMode='contain'
        />
      </View>

      <Animatable.View animation='fadeInUp' delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Seja bem vindo! Nós somos a Pet Shop</Text>
        <Text style={styles.subtitle}>Faça o login para começar</Text>

        <Link href="/(tabs)/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acessar</Text>
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
  containerLogo: {
    flex: 2,
    backgroundColor: "#03bb85",
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#a1a1a1'
  },
  button: {
    position: 'absolute',
    backgroundColor: "#03bb85",
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  }
})