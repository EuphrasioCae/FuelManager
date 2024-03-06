import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import Calculadora from './Calculadora';
import Gastos from './Gastos';

const Home = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'gastos', title: 'Gastos' },
    { key: 'calculadora', title: 'Calculadora' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    gastos: Gastos,
    calculadora: Calculadora,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Home;
