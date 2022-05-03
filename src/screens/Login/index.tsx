import * as React from 'react';
import { View, StyleSheet, Button, TextInput, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { getCurrentProject } from '../../services/api/projectServices';
import { login as postLogin } from '../../services/api/userServices';
import { observer } from "mobx-react-lite"
import { subject } from '../../';

const LoginScreen = observer((props: any) => {
    const [username, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState<boolean>(false)
    const login = async () => {
        setLoading(true)
        try {
            const project: any = await getCurrentProject()
            const dataLogin: any = await postLogin({ username, password }, project.data)
            console.log('====================================');
            console.log("data", dataLogin);
            console.log('====================================');
            subject.next({ token: dataLogin.data.access_token, project: project.data })
            props.navigation.navigate("home")
        } catch (error: any) {
            console.log('====================================');
            console.log("error", error);
            console.log('====================================');
            Alert.alert("Thất bại")
        }
        setLoading(false)
    }
    return (
        <View style={styles.container}>
            {loading && <View style={{ backgroundColor: "rgba(0,0,0,0.4)", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>}
            <View>
                <View style={{}}>

                    <TextInput
                        placeholder='Nhập username'
                        style={{
                            borderRadius: 6,
                            borderColor: "#1a1a1a",
                            borderWidth: 1,
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            width: Dimensions.get("window").width - 60, marginVertical: 20
                        }}
                        value={username}
                        onChangeText={setUserName}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder='Nhập password'
                        style={{
                            borderRadius: 6,
                            borderColor: "#1a1a1a",
                            borderWidth: 1,
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            width: Dimensions.get("window").width - 60, marginVertical: 20
                        }}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <Button title='Login' onPress={login} />
            </View>
        </View>
    );
});

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row',
        padding: 24
    }
});
