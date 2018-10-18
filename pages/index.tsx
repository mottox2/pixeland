import React from 'react'
import PixlaClient from 'pixela-node'

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
    this.client.username = ''
    this.client.token = ''
  }

  async componentDidMount() {
    const res = await this.client.getGraphs()
    this.setState({
      graphs: res.data.graphs
    })
  }

  render() {
    const { graphs } = this.state
    return (
      <div>
        <p>Welcome to next.js!</p>
        {graphs.map(graph => {
          return (
            <div>
              <p>{graph.name}</p>
              <img src={this.client.getGraphUrl(graph.id)} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default IndexPage
