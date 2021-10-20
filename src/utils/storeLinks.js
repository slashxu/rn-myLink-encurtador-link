import AsyncStorage from '@react-native-async-storage/async-storage';

// Buscar os links salvos
export async function getLinksSave(key){
  const myLinks = await AsyncStorage.getItem(key);

  // Senao achae ele transforma em array vazio
  let linkSaves = JSON.parse(myLinks) || [];  

  return linkSaves;
}

// Salvar um link no Storage
export async function saveLink(key, newLink){
  // Busca todos links que ja tem salvo
  let linksStored = await getLinksSave(key);

  // Ignora caso link seja duplciado
  const hasLink = linksStored.some( link => link.id === newLink.id);

  if(hasLink){
    console.log('Esse link já existe na lista');
    return;
  }

  // Envia para lista
  linksStored.push(newLink);
  await AsyncStorage.setItem(key, JSON.stringify(linksStored));
  console.log('Link salvo com sucesso');
}

// Deletar link
export async function deleteLink(links, id){
  // Retorna todos itens, menos o que esta passando no parametro
  let myLinks = links.filter((item) => {
    return (item.id !== id);
  })

  await AsyncStorage.setItem('sujeitolinks', JSON.stringify(myLinks));
  console.log('Link deletado com sucesso');

  return myLinks;
}