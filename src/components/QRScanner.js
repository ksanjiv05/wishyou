// import React from 'react';
// import {StyleSheet, Text, TouchableOpacity, Linking, View} from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
// import Colors from '../config/Colors';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// function QRScanner() {
//   const [isFlash, setIsFlash] = React.useState(false);

//   const onSuccess = e => {
//     console.log('on success data ', e.data);
//     Linking.openURL(e.data).catch(err =>
//       console.error('An error occured', err),
//     );
//     console.log('qr data ', e.data);
//   };
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: Colors.secondary,
//       }}>
//       <QRCodeScanner
//         onRead={onSuccess}
//         cameraStyle={{
//           borderRadius: 25,
//           borderWidth: 2,
//           borderColor: Colors.secondary,
//           overflow: 'hidden',
//           marginLeft: 10,
//           marginRight: 20,
//           marginBottom: 30,
//         }}
//         containerStyle={{paddingVertical: 30}}
//         flashMode={
//           isFlash
//             ? RNCamera.Constants.FlashMode.torch
//             : RNCamera.Constants.FlashMode.off
//         }
//         topContent={
//           <Text style={styles.centerText}>Scan QR to Add Contacts</Text>
//         }
//         bottomViewStyle={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//           //   backgroundColor: 'red',
//         }}
//         bottomContent={
//           <TouchableOpacity
//             style={styles.buttonTouchable}
//             onPress={() => setIsFlash(!isFlash)}>
//             <FontAwesome name="flash" size={30} />
//           </TouchableOpacity>
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: Colors.primary,
//   },

//   buttonTouchable: {
//     padding: 16,
//   },
// });

// export default QRScanner;
