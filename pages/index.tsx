import React from 'react'
import PixlaClient from 'pixela-node'
import GraphForm from '../src/components/GraphForm'
import styled from 'styled-components'

interface Props {}
interface State {
  graphs: any[]
}

class IndexPage extends React.Component<Props, State> {
  client: PixlaClient

  state = {
    graphs: []
  }

  constructor(props) {
    super(props)

    this.client = new PixlaClient()
    this.client.username = process.env.PIXELA_USERNAME
    this.client.token = process.env.PIXELA_TOKEN
  }

  async componentDidMount() {
    this.fetchGraphs()
  }

  fetchGraphs = async () => {
    const res = await this.client.getGraphs()
    this.setState({
      graphs: res.data.graphs
    })
  }

  createGraph = async graph => {
    const res = await this.client.createGraph(graph)
    this.fetchGraphs()
  }

  deleteGraph = async graphId => {
    await this.client.deleteGraph(graphId)
    this.fetchGraphs()
  }

  createPixel = async graphId => {
    await this.client.incrementPixel(graphId)
  }

  deletePixel = async graphId => {
    await this.client.decrementPixel(graphId)
  }

  render() {
    const { graphs } = this.state
    return (
      <div>
        <header>
          <Logo src="/static/logo.svg" />
        </header>

        {graphs.map(graph => {
          return (
            <Cell
              style={{ backgroundImage: `url(${this.client.getGraphUrl(graph.id)}` }}
              key={graph.id}
            >
              <CellBody>
                <p>
                  {graph.name}
                  <button onClick={() => this.deleteGraph(graph.id)}>x</button>
                </p>
                {/* <img src={this.client.getGraphUrl(graph.id)} /> */}
                <br />
                <button onClick={() => this.createPixel(graph.id)}>Commit!</button>
                <button onClick={() => this.deletePixel(graph.id)}>Delete Commit!</button>
              </CellBody>
            </Cell>
          )
        })}
        <p>グラフの追加</p>
        <GraphForm onSubmit={this.createGraph} />
      </div>
    )
  }
}

const Cell = styled.div`
  float: left;
  width: calc(48% - 2px);
  margin: 0 1%;
  height: auto;
  position: relative;
  background-position: right;
  background-repeat: no-repeat;
  background-size: 390vw;
  background-position-x: 91.4%;
  background-position-y: 37%;
  border: 1px solid #eee;
  &:after {
    content: ' ';
    position: relative;
    display: block;
    padding-bottom: 100%;
  }
`

const CellBody = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`

const Logo = styled.img`
  padding: 4px;
`

export default IndexPage
