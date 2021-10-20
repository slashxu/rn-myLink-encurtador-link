import React, { useState, useEffect } from 'react';
import { Modal, ActivityIndicator } from 'react-native';

import Menu from '../../components/Menu';
import ListItem from '../../components/ListItem';
import StatusBarPage from '../../components/StatusBarPage';
import { Container, Title, ListLinks, ContainerEmpty, WarningText } from './styles';
import { useIsFocused } from '@react-navigation/native';
import { getLinksSave, deleteLink } from '../../utils/storeLinks';
import ModalLink from '../../components/ModalLink';

export default function myLinks() {

  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {

    async function getlinks(){
      const result = await getLinksSave('sujeitolinks');
      setLinks(result);
      setLoading(false);
    }

    getlinks();

  }, [isFocused]);

  function handleItem(item){
    setData(item);
    setModalVisible(true);
  }

  async function handleDelete(id){
    const result = await deleteLink(links, id);
    setLinks(result);
  }
  return (
    <Container>
      <StatusBarPage 
        barStyle="ligth-content"
        BackgroundColor="#132742"
         />

         <Menu />

      <Title>Meus Links</Title>

      {
        loading && (
          <ContainerEmpty>
            <ActivityIndicator color="#FFF" size={25} />
          </ContainerEmpty>
        )
      }

      {
        !loading && links.length === 0 && (
          <ContainerEmpty>
            <WarningText>Você não possui nenhum link</WarningText>
          </ContainerEmpty>
        )
      }

      <ListLinks
        data={links}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ListItem data={item} selectedItem={ handleItem } deleteItem={ handleDelete } /> }
        contentContainerStyle={{paddingBottom: 22}}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={modalVisible} transparent animationType="slide" >
        <ModalLink onClose={ () => setModalVisible(false) } data={data} />
      </Modal>

    </Container>
  )
 }
