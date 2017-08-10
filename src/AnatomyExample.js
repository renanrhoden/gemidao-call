import React, { Component } from 'react';
import { Container, Header, Input, Title, Content, Footer, FooterTab, Item, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class AnatomyExample extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Gemidão do Zap</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Item regular>
                        <Input
                            placeholder='Regular Textbox'
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            />
                    </Item>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}