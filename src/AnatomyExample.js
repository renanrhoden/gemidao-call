import React, {Component} from 'react';
import {
    Container,
    Header,
    Input,
    Title,
    Content,
    Footer,
    FooterTab,
    Item,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text
} from 'native-base';
import Bluebird, {reject} from 'bluebird';
import agent from 'superagent';
import promisifyAgent from 'superagent-promise';
import Banner from './Banner';
import {Alert, Linking} from 'react-native';
import {FacebookAds} from 'expo';

export default class AnatomyExample extends Component {
    constructor(props) {
        super(props);
        this.state = {de: '', para: '', token: '', sms: false, cont: 0}
    }

    gemidao = () => {

        this.setState({cont: (this.state.cont + 1)});
        console.log(this.state.cont);
        if ((this.state.cont % 2) !== 0) {
            FacebookAds.InterstitialAdManager.showAd('1175457135931729_1175703245907118')
                .then(didClick => {
                })
                .catch(error => {
                    console.log(error + error.message())
                })
        }
        if (!/^[a-f0-9]{32}$/.test(this.state.token)) {
            console.log('Token inválido. Obtenha um em https://totalvoice.com.br');
            Alert.alert(
                'OOPS',
                'Token inválido. Obtenha um em https://totalvoice.com.br',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
            return;
        }

        if (!/^[0-9]{10,11}$/.test(this.state.para)) {
            console.log('Número de telefone inválido');
            Alert.alert(
                'OOPS',
                'Número de telefone inválido',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );
            return;
        }

        const action = this.state.sms
            ? sms(this.state.para, this.state.token)
            : call(this.state.de, this.state.para, this.state.token);

        return action
            .then(() => {
                Alert.alert(
                    'yey',
                    'Gemidão enviado',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                );
            })
            .catch(err => {
                if (err.status === 405 || err.status === 403) {
                    console.log(err.body || err.response.body.mensagem);
                }

                return reject(err);
            })
    };


    render() {
        return (
            <Container>
                <Header>
                    <Body full>
                    <Title style={{paddingTop: 20}}>
                        Gemidão do Zap
                    </Title>
                    </Body>
                </Header>
                <Content>
                    <Item regular>
                        <Input
                            keyboardType={'numeric'}
                            placeholder='De: 51999999999'
                            onChangeText={(text) => this.setState({de: text})}
                            value={this.state.de}
                        />
                    </Item>
                    <Item regular>
                        <Input
                            keyboardType={'numeric'}
                            placeholder='Para: 51999999999'
                            onChangeText={(text) => this.setState({para: text})}
                            value={this.state.para}
                        />
                    </Item>
                    <Item regular>
                        <Input
                            placeholder='token: '
                            onChangeText={(text) => this.setState({token: text})}
                            value={this.state.token}
                        />
                    </Item>
                    <Button full onPress={this.gemidao}>
                        <Text>Enviar</Text>
                    </Button>
                    <Banner placementId="1175457135931729_1175460135931429"/>
                </Content>
                {/*<Banner placementId="1175457135931729_1175460135931429" />*/}
                <Footer>
                    <FooterTab>
                        <Button full onPress={() => {
                            Alert.alert(
                                'Atenção',
                                'Você será redirecionado ao site do TotalVoice. Crie uma conta gratuita para receber seu token e usá-lo no app',
                                [
                                    {text: 'OK', onPress: () => Linking.openURL('http://www.totalvoice.com.br')},
                                ],
                                {cancelable: false}
                            );
                        }}>
                            <Text>Obtenha um token</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
const request = promisifyAgent(agent, Bluebird);
const route = path => `https://api.totalvoice.com.br${path}`;

const gemidaoInText = 'OOOWH AHHHWN WOOOO AAAAHN WAAAAA AAAAAAHN ANN WAAA!\n'
    + 'Voce caiu no gemidao do zap';

const sms = (to, token) => request.post(route('/sms'))
    .set('Access-Token', token)
    .set('Accept', 'application/json')
    .send({numero_destino: to, mensagem: gemidaoInText});

const call = (from, to, token) => request.post(route('/composto'))
    .set('Access-Token', token)
    .set('Accept', 'application/json')
    .send({
        numero_destino: to,
        dados: [
            {
                acao: 'audio',
                acao_dados: {
                    url_audio: 'https://github.com/haskellcamargo/gemidao-do-zap/raw/master/resources/gemidao.mp3'
                }
            }
        ],
        bina: from
    });