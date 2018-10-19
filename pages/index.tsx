import React from 'react'
import PixlaClient from 'pixela-node'
import GraphForm from '../src/components/GraphForm'
import GraphCell from '../src/components/GraphCell'
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
    console.log(this.client)
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
        <BackgroundColor />
        <header>
          <Logo src="/static/logo.svg" />
        </header>

        {graphs.map(graph => {
          return (
            <GraphCell
              createPixel={this.createPixel}
              deletePixel={this.deletePixel}
              refresh={this.fetchGraphs}
              graph={graph}
              username={process.env.PIXELA_USERNAME}
              key={graph.id}
            />
          )
        })}
        <p>グラフの追加</p>
        <GraphForm onSubmit={this.createGraph} />
      </div>
    )
  }
}

const Logo = styled.img`
  padding: 4px;
  margin: 0 auto;
  display: block;
  margin-bottom: 8px;
`

const BackgroundColor = styled.div`
  background-color: #eef0ea;
  height: calc(25vw + 60px);

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
`

const GraphsContainer = styled.div``

export default IndexPage
