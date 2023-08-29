# Melhorias de Performance - Armando Assini

O presente projeto consiste no desenvolvimento de melhorias em performance de páginas pré-programadas pelo professor. Tratam-se de 6 telas, cada uma com uma funcionalidade diferente, todas completamente funcionais porém apresentando algumas falhas de performance.

Todo o processo foi desenvolvido utilizando _ReactJS_.

## Começando

Para rodar o projeto é necessario clonar o repositório para seu computador e fazer as instalações mencionadas a seguir para rodá-lo em browser. Todos os browsers são suportados, porém é possível que ocorram leves diferenças de visualização dependendo do software e da versão do software utilizados.

### Instalação

Para realizar as instalações necessárias, siga o seguinte passo a passo:

Primeiramente clone o repositório para sua máquina, utilize o método de clone que preferir:

    https://git.raroacademy.com.br/armando.assini/atividade-avaliativa-7

Em seguida abra o repositório e utilize o seguinte comando para instalar as dependências do projeto:

    npm install

A partir destas instalações o projeto já estará funcional. Rodando o comando seguinte, um servidor irá abrir onde a aplicação estará rodando:

    npm run dev

No terminal será mostrado um link de onde pode ser visualizada a aplicação:

![http://localhost:5173](<Readme Assets/LinkLocal.png>)

A princípio para o projeto, as 6 páginas disponíveis não se interconectavam, necessitando uma mudança no código para visualizar cada página individualmente. Para facilitar a visualização das páginas foi implementada a utilização de _Routers_, de forma que o acesso a cada página pode ser realizado através de links presentes no cabeçalho de cada uma delas. Esta funcionalidade não faz parte do trabalho mas é importante denotar também que este cabeçalho não re-renderiza mediante mudanças que não o envolvem, portanto não apresentam peso na performance geral do trabalho.

## Visão Geral do Projeto

Para a montagem do projeto foi fornecido um repositório contento todo o conteúdo utilizado na criação das 6 págians mencionadas. A seguir temos cada uma delas:

<div align="center" style="display:flex">
    <p>
        <img style="width:95%; border-radius:10px" src="Readme Assets/Tela ListKeys.png" alt="Tela ListKeys"></br>
        <em>Tela ListKeys</em>
    </p>
    <p>
        <img style="width:95%; border-radius:10px" src="Readme Assets/Tela ContadorComErros.png" alt="Tela Contador com Erros"></br>
        <em>Tela Contador Com Erros</em>
    </p>
</div>
<div align="center" style="display:flex">
    <p>
        <img style="width:95%; border-radius:10px" src="Readme Assets/Tela CampoDeBusca.png" alt="Tela Campo De Busca">
        </br>
        <em>Tela Campo de Busca</em>
    </p>
    <p>
        <img style="width:95%; border-radius:10px" src="Readme Assets/Tela ColorResponsive.png" alt="Tela Color Responsive">
        </br>
        <em>Tela Color Responsive</em>
    </p>
</div>
<div align="center" style="display:flex">
    <p>
        <img style="width:95%; border-radius:10px" src="Readme Assets/Tela Chat.png" alt="Tela Chat"></br>
            <em>Tela Chat</em>
    </p>
    <p>
    <img style="width:95%; border-radius:10px" src="Readme Assets/Tela Marketplace.png" alt="Tela Marketplace"></br>
        <em>Tela Marketplace</em>
    </p>
</div>

## Construção do Projeto

### Objetivo

Como mencionado o projeto foi todo realizado utilizando _ReactJS_.

O objetivo principal da prática foi habituar os alunos com a prática da otimização de performance dos códigos.

### Desenvolvimento

Após clonar o repositório fornecido pelo professor, foi realizada uma varredura dos códigos e das telas para encontrar possíveis pontos de melhoria. Encontrados esses pontos deu-se início às implementações.

A seguir serão demonstradas as implementações separadas por página:

#### ListKeys

Nesta página, inicialmente, para cada clique no botão _'adiciona input'_, todas as inputs em tela estavam sendo re-renderizadas, porém como a adição de um novo campo não afeta os campos já existentes, esse comportamento não era desejado.

A melhoria implementada exigiu 2 passos:

- Adicionar uma _key_ ao método _map_ encarregado de adicionar novas _inputs_ à lista;
- Envolver o componente _Input_ com um _memo_;

```ts
// ListKeys index
<Input  
    label={input} 
    name={input} 
/>

// Input Component
export const Input: React.FC<InputProps> = ({ label, name }) => {
  //...
}
```

<div align="center" style="padding-bottom : 10px"><em>Código original</em></div>

```ts
// ListKeys index
<Input  
    key={input} 
    label={input} 
    name={input} 
/>

// Input Component
export const Input: React.FC<InputProps> = memo(({ label, name }) => {
  //...
})
```

<div align="center" style="padding-bottom : 10px"><em>Código alterado</em></div>

A combinação dessas alterações faz com que as _inputs_ adicionadas à lista não encontrem problemas de relacionamento entre componente e _DOM_, evitando erros de renderização, e também com que as _inputs_ já existentes na lista não sejam re-renderizadas porque não há alterações de seus parâmetros ou estados.

#### Contador com Erros

Para esta página primeiramente foi utilizado um _memo_ envolvendo o componente _'Error'_, visto que todas as mensagens de erro inicialmente estavam sendo renderizadas para cada clique em algum dos botões. Essa melhoria já impediu a re-renderização desnecessária das mensagens de erro.

```ts
// ContadorComErros index
const Error: React.FC = ({ children }) => {
  //...
}
```

<div align="center" style="padding-bottom : 10px"><em>Código original</em></div>

```ts
// ContadorComErros index
const Error: React.FC = memo(({ children }) => {
  //...
})
```

<div align="center" style="padding-bottom : 10px"><em>Código alterado</em></div>

Ainda na tela do Contador, foi notado que o _useEffect_ não era necessário, visto que um clique no botão já altera o valor do contador, o tratamento do erro que é realizado dentro do _useEffect_ pode ser realizado dentro da chamada das funções _'incrementa'_ e _'decrementa'_. Portanto ao alocar o tratamento dos erros dentro das funções, elimina-se o uso de _useEffect_ evitando operações desnecessárias.

```ts
useEffect(() => {
  if (contador < 0) {
    setErros([
      {
        id: faker.datatype.uuid(),
        erro: 'Contador não pode ser menor que zero',
      },
      ...erros,
    ])
  }

  if (contador > 10) {
    setErros([
      {
        id: faker.datatype.uuid(),
        erro: 'Contador não pode ser maior que dez',
      },
      ...erros,
    ])
  }
}, [contador])

const incrementa = () => {
  setContador(contador + 1)
}

const decrementa = () => {
  setContador(contador - 1)
}
```

<div align="center" style="padding-bottom : 10px"><em>Código original</em></div>

```ts
const incrementa = () => {
  if (contador <div 10) {
    setContador(contador + 1)
    console.log(erros.length)
  } else {
    setErros((erros) => [
      {
        id: faker.datatype.uuid(),
        erro: 'Contador não pode ser maior que dez',
      },
      ...erros,
    ])
  }
}

const decrementa = () => {
  if (contador > 0) {
    setContador(contador - 1)
  } else {
    setErros((erros) => [
      {
        id: faker.datatype.uuid(),
        erro: 'Contador não pode ser menor que zero',
      },
      ...erros,
    ])
  }
}
```

<div align="center" style="padding-bottom : 10px"><em>Código alterado</em></div>

Finalmente, foi também modificada o resultado do contador, de forma que ele não ultrapasse os limites previstos pelos erros (0<_contador_<10), porém essa modificação por si só é apenas visual.

#### Campo de Busca

Para o _'Campo de Busca'_ a melhoria implementada foi um _debounce_ no _setPessoas_, para que o texto digitado na busca somente seja buscado quando o usuário termina de digitar o que deseja. Dessa forma as renderizações que a princípio seriam realizadas a cada tecla digitada, após o _debounce_ se resumirão a apenas uma ao fim da digitação.

```ts
//CampoDeBusca index
useEffect(() => {
  if (query)
    setPessoas((pessoas) =>
      pessoas.filter((pessoa) => pessoa.name.first.includes(query))
    )
}, [query])
```

<div align="center" style="padding-bottom : 10px"><em>Código original</em></div>

```ts
//CampoDeBusca index
import useDebounce from '../../hooks/useDebounce'
//...
const { debounce } = useDebounce(300)
//...
useEffect(() => {
  if (query)
    debounce(() =>
      setPessoas((pessoas) =>
        pessoas.filter((pessoa) => pessoa.name.first.includes(query))
      )
    )
}, [query])
```

<div align="center" style="padding-bottom : 10px"><em>Código alterado</em></div>

#### Color Responsive

Infelizmente para esta tela não foram implementadas melhorias, apesar de identificados pontos de possível otimização.

#### Chat

Na página de Chat também foi implementado um _debounce_ na busca de mensagens. Porém neste caso como a extrutura é mais complexa do que a existente no _Campo de Busca_ a implementação foi realizada em 'ponto médio', entre o _input_ e a atualização do estado da variável _buscaMensagem_. Dessa forma, apenas após o usuário terminar de digitar, a variável é atualizada, e em seguida as mensagens são filtradas e renderizadas em tela.

```ts
// ChatHeader index
value={ chat.buscaMensagem }
onChange={ event => chat.setBuscaMensagem(event?.target.value) }
```

<div align="center" style="padding-bottom : 10px"><em>Código original</em></div>

```ts
// ChatHeader index
import useDebounce from '../../hooks/useDebounce'
//...
const [searchTerm, setSearchTerm] = useState('')
const { debounce } = useDebounce(300)
//...
value={searchTerm}
onChange={(event) => setSearchTerm(event?.target.value)}
```

<div align="center" style="padding-bottom : 10px"><em>Código alterado</em></div>

#### Marketplace

Finalmente, para o _'Marketplace'_, inicialmente, a cada renderização do _relógio_ todos os componentes da página estavam sendo renderizados. Porém como exitem componentes que não apresentam alterações a cada segundo, foram implementadas as seguintes alterações:

- Envolver o componente _'RegistroDeCompra'_, dessa forma o componente, quando presente dentro do componente _'HistoricoDeCompras'_, não será re-renderizado a cada segundo;

```ts
//RegistroDeCompra index
export const RegistroDeCompra: React.FC<RegistroDeCompraProps> = ({
  compra,
}) => {
  //...
}
```

<div align="center" style="padding-bottom : 10px"><em>Código original</em></div>

```ts
//RegistroDeCompra index
import { memo } from 'react'
//...
export const RegistroDeCompra: React.FC<RegistroDeCompraProps> = memo(
  ({ compra }) => {
    //...
  }
)
```

<div align="center" style="padding-bottom : 10px"><em>Código alterado</em></div>

- Utilizar um _useMemo_ na chamada do _'comprarProduto'_ que se trata da chamada do _onClick_ de cada card de produtos, juntamente com um memo no _'CardProduto'_, dessa forma os cards de produto passam a não serem re renderizados para cada segundo do relógio, e sim somente quando são comprados, ou quando há alguma alteração nos produtos.

```ts
//ListaProdutos index
const comprarProduto = (produtoComprado: Produto) => {
  //...
}
```

<div align="center" style="padding-bottom : 10px"><em>Código original</em></div>

```ts
//ListaProdutos index
import { useMemo } from 'react'
//...
const comprarProduto = useMemo(
  () => (produtoComprado: Produto) => {
    //...
  },
  [produtos]
)
```

<div align="center" style="padding-bottom : 10px"><em>Código alterado</em></div>

### Dificuldades Encontradas

Como dificuldade principal da atividade, é necessário citar a compreensão dos códigos, visto que esta é a primeira atividade do curso em que utilizamos um código que não é de autoria própria. Foi um desafio grande pricipalmente por envolver estruturas e estratégias ainda desconhecidas, levando à necessidade de procurar entender tanto o funcionamento quantos as soluções que poderiam ser utilizadas em cada caso.

Além disso, ainda é importante citar as dificuldades encontradas, mesmo após identificar pontos de melhoria, para implementar as otimizações, seja pela complexidade do código ou seja pela incerteza da utilização das funções estudadas durante a última semana.

## Conclusão

Ao final do projeto foi possível implementar uma série de otimizações nos códigos apresentados e compreender a utilização das funções de estados e de memorização, e como essas funções são importantes no quesito performance de um código.

## Possíveis Melhoras

Segue uma lista de sugestões de melhorias futuras:

#### ListKeys

- Utilizar uma _key_ diferente para o método map, ou implementar uma lógica para impedir nomes repetidos. Da forma que foi implementado, o método utiliza o nome gerado pelo _faker_ como _key_, porém a partir do momento que é gerado um nome repetido, ocorrem problemas.

#### Contador com Erros

- Implementar lógica para impedir que o botão que não estiver sendo clicado também seja re-renderizado;
- Implementar uma lógica onde apenas uma mensagem de erro seja mostrada, e que seja substituída em caso de um novo erro, porém, se o novo erro for igual ao anterior, não há necessidade de re-renderizar o componente.

#### Campo de Busca

- Implementar uma lógica onde ao selecionar um dos nomes da lista, uma nova lista seja gerada sem que seja necessário digitar um novo query, em seguida apagá-lo e finalmente clicar fora da input. Impedindo as renderizações que ocorrem ao digitar as teclas;
- Implementar uma lógica para que a lista de uma dada requisição não seja substituída pelos nomes filtrados após uma digitação, dessa forma não será feita uma nova requisição para a _API_ caso o usuário tenha digitado equivocadamente e precisar apagar o que foi feito;
- Implementar lógica para que não sejam renderizados todos os nomes da lista a cada _hover_ em um dos nomes dessa mesma lista.

#### Color Responsive

- Implementar lógica para que ocorra apenas uma renderização após a mudança do tamanho da tela após o valor do _breakpoint_. Durante o projeto foi constatado que no momento em que a largura da tela é igual a um dos _breakpoints_ ocorre uma renderização, mas que também occorre uma re-renderização no movimento seguinte das dimensões da tela, o que não deveria acontecer visto que nenhum parâmentro que define as renderizações é alterado após a primeira renderização.

#### Chat

- Implementar lógica para que o header não seja atualizado a cada nova mensagem;
- Implementar lógica para que as mensagens já existentes no chat não sejam re-renderizadas a cada nova mensagem.

#### Marketplace

- Implementar lógica para que os componentes _'listaDeProdutos'_ e _'históricoDeCompras'_ não sejam re-renderizados a cada segundo do relógio, e sim a cada alteração das props dos componentes.

## Autor

- **Armando Assini** - *arm.assini@gmail.com*

**Contribuições** - Professores, Monitores e Colegas de classe Turma React2 - Raro Academy.
