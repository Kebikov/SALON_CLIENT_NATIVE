import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import handleSingInWithGoogle from './helpers/handleSingInWithGoogle';


WebBrowser.maybeCompleteAuthSession();


interface IJoinGoogle {
	/**
	 * Надо ли border в кнопке.
	 */
	border?: boolean;
}


/**
 * @component Кнопка, вход с Google.
 * @param border Надо ли border в кнопке.
 * @example <JoinGoogle border={#} />
 * @returns {JSX.Element}
 */
const JoinGoogle: FC<IJoinGoogle> = ({ border = false }) => {

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: process.env.ANDROID_CLIENT_ID,
		iosClientId: process.env.IOS_CLIENT_ID,
		webClientId: process.env.WEB_CLIENT_ID,
	});

	useEffect(() => {
        handleSingInWithGoogle(response);
	}, [response]);


	return (
		<Pressable onPress={() => promptAsync()} style={[styles.main, border ? styles.border : null]}>
			<View style={styles.container}>
				<Image source={require('@/source/img/logo/google.png')} style={styles.img} />
				<Text style={styles.text}>Регистрация с Google</Text>
			</View>
		</Pressable>
	);
};


const styles = StyleSheet.create({
	main: {
		width: '100%',
		height: 60,
		borderRadius: 35,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15
	},
	container: {
		position: 'relative'
	},
	text: {
		fontSize: 16,
		fontWeight: '500',
		paddingLeft: 30,
		color: COLOR_ROOT.MAIN_COLOR
	},
	img: {
		position: 'absolute',
		left: -10,
		top: -5,
		width: 35,
		height: 35
	},
	border: {
		borderWidth: 1,
		borderColor: COLOR_ROOT.MAIN_COLOR
	}
});


export default JoinGoogle;
