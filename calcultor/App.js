
import React, { useState } from 'react';
import {
  Button,
  ImageBackground,
  LogBox,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Btn from './component/Button';
const image = {
  uri: 'https://i.pinimg.com/originals/e1/4c/32/e14c32f5c46181e831f806b96f6caf79.jpg',
};
export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);
  const itemsLeft = [
    '/',
    '±',
    'C',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    '1',
    '.',
    '0',
  ];


  const itemRight = ['X', '-', '+'];


  const handleClick = (value) => {
    if (value == 'C') clear();
    else setExpression(expression + value);
  };




  const clear = () => {
    setExpression('');
  };


  
  const caculate = () => {
    if (expression == '') {
      setResult(0);
    } else {
      let str = expression;
      for (let i = 0; i < expression.length; i++) {
        str = str.replace('-+', '-');
        str = str.replace('+-', '-');
        str = str.replace('--', '+');
        str = str.replace('++', '+');
      }
      var chars = str.split('');
      var n = [],
        op = [],
        index = 0,
        oplast = true;
      n[index] = '';
      for (var c = 0; c < chars.length; c++) {
        if (isNaN(parseInt(chars[c])) && chars[c] !== '.' && !oplast) {
          op[index] = chars[c];
          index++;
          n[index] = '';
          oplast = true;
        } else {
          n[index] += chars[c];
          oplast = false;
        }
      }
      let expr = parseFloat(n[0]);
      for (var o = 0; o < op.length; o++) {
        var num = parseFloat(n[o + 1]);
        switch (op[o]) {
          case '+':
            expr = expr + num;
            break;
          case '-':
            expr = expr - num;
            break;
          case 'X':
            expr = expr * num;
            break;
          case '/':
            expr = expr / num;
            break;
        }
      }
      setResult(expr);
      setExpression('');
    }
  };
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
        <View style={styles.content}>
          <Text style={styles.expression}>{expression}</Text>
          <Text style={styles.result}>{result}</Text>
          <View style={styles.keyBooard}>
            <View style={styles.leftKeyBooard}>
              {itemsLeft.map((item) => {
                return (
                  <Btn
                    text={item}
                    textStyle={styles.textButton}
                    onPress={() => handleClick(item)}
                    zero={styles.button}
                  ></Btn>
                );
              })}
            </View>
            <View style={styles.rightKeyBooard}>
              {itemRight.map((item) => {
                return (
                  <Btn
                    text={item}
                    textStyle={styles.textButton}
                    onPress={() => handleClick(item)}
                    zero={styles.button}
                  ></Btn>
                );
              })}
              <Btn
                text="="
                textStyle={styles.textButtonEq}
                onPress={caculate}
                zero={styles.buttonEq}
              ></Btn>
            </View>
          </View>
        </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    margin: '5%',
    padding: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  keyBooard: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
  },
  leftKeyBooard: {
    width: '75%',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  rightKeyBooard: {
    width: '20%',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
  },
  button: {
    width: 65,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    margin: 3,
    backgroundColor: '#CCCCCC',
    borderRadius: 200,
  },
  buttonEq: {
    width: 65,
    height: 140,
    alignItems: 'center',
    padding: 20,
    margin: 3,
    backgroundColor: '#FF66CC',
    borderRadius: 200,
    alignContent: 'flex-start',
  },
  textButton: {
    color: '#000000',
    fontSize: 20,
  },
  textButtonEq: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 40,
    marginTop: '190%',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  box: {
    width: 50,
    height: 50,
  },
  result: {
    alignSelf: 'flex-end',
    fontSize: 30,
    color: '#BBBBBB',
  },
  expression: {
    alignSelf: 'flex-end',
    fontSize: 20,
    color: '#BBBBBB',
  },
});