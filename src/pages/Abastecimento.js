import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {RadioButton, Text, TextInput, Button, Appbar } from 'react-native-paper';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';

import { useNavigation } from '@react-navigation/native';

const Abastecimento = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [tipo, setTipo] = useState('gas');
  const [preco, setPreco] = useState(null);
  const [valor, setValor] = useState(null);
  const [odometro, setOdometro] = useState(null);
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'));

  useEffect(() => {
    if (item) {
      setTipo(item.tipo == 0 ? 'gas' : 'eta');
      setData(item.data);
      setPreco(item.preco.toFixed(2));
      setValor(item.valor.toFixed(2));
      setOdometro(item.odometro.toFixed(0));
    }
  }, [item]);

  const handleSalvar = () => {
    console.log('Salvar');
  };

  const handleExcluir = () => {
    console.log('Exluir');
  };

  return (
    <Container>
      <Header title={'Abastecimento'} goBack={() => navigation.goBack()}>
        <Appbar.Action icon="check" onPress={handleSalvar} />
        {item && <Appbar.Action icon="trash-can" onPress={handleExcluir} />}
      </Header>

      <Body>
        <View style={styles.containerRadio}>
          <View style={styles.containerRadioItem}>
            <RadioButton
              value="first"
              status={tipo === 'gas' ? 'checked' : 'unchecked'}
              color={'red'}
              onPress={() => setTipo('gas')}
            />
            <Text>Gasolina</Text>
          </View>

          <View style={styles.containerRadioItem}>
            <RadioButton
              value="first"
              status={tipo === 'eta' ? 'checked' : 'unchecked'}
              color={'green'}
              onPress={() => setTipo('eta')}
            />
            <Text>Etanol</Text>
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);
              setData(moment(date).format('DD/MM/YYYY'));
            }}
          />
        )}

        <TouchableOpacity onPress={() => setShow(true)}>
          <Input label="Data" value={data} editable={false} />
        </TouchableOpacity>

        <Input
          label="Preço"
          value={preco}
          onChangeText={(text) => setPreco(text)}
        />

        <Input
          label="Valor"
          value={valor}
          onChangeText={(text) => setValor(text)}
        />

        <Input
          label="Odomêtro"
          value={odometro}
          onChangeText={(text) => setOdometro(text)}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerRadio: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default Abastecimento;
