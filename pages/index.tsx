import React from 'react'
import PixlaClient from 'pixela-node'
import GraphForm from '../src/components/GraphForm'

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
        <p>Welcome to Pixeland</p>
        {graphs.map(graph => {
          return (
            <div key={graph.id}>
              <p>
                {graph.name}
                <button onClick={() => this.deleteGraph(graph.id)}>x</button>
              </p>
              <img src={this.client.getGraphUrl(graph.id)} />
              <br />
              <button onClick={() => this.createPixel(graph.id)}>Commit!</button>
              <button onClick={() => this.deletePixel(graph.id)}>Delete Commit!</button>
            </div>
          )
        })}
        <p>グラフの追加</p>
        <GraphForm onSubmit={this.createGraph} />
      </div>
    )
  }
}

export default IndexPage
