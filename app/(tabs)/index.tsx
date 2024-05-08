import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";

const App = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); //site aonde ele busca o cep conforme o que foi digitado
      setAddress(response.data);
    } catch (error) {
      console.error("Error fetching address:", error); //erro ao procurar o cep digitado
      setAddress(null);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{ borderColor: "Black", borderWidth: 1, margin: 1 }}
        placeholder="Digite o CEP" //oque esta escrito na caixa
        value={cep} //onde digita o text
        onChangeText={setCep} //quando digitar o numero ele vai ser o cep a procurar
        keyboardType="numeric" //teclado numerico
      />

      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {address && (
        <View>
          <Text>CEP: {address.cep}</Text>
          {/* resposta do numero do cep  */}
          <Text>
            Rua: {address.logradouro}
            {/*rua do cep digitado */}
          </Text>
          <Text>
            Bairro: {address.bairro}
            {/*bairro do cep digitado*/}
          </Text>
          <Text>
            Cidade: {address.localidade}
            {/*cidade do cep digitado */}
          </Text>
          <Text>
            Estado: {address.uf}
            {/*estado  do cep digitado */}
          </Text>
        </View>
      )}
    </View>
  );
};

export default App;
