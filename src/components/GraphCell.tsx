import React from 'react'
import styled from 'styled-components'

interface Props {
  refresh: () => void
  createPixel: (graphId: string) => void
  deletePixel: (graphId: string) => void
  graph: any
  username: string
}

class GraphCell extends React.Component<Props, any> {
  constructor(props) {
    super(props)

    this.state = {
      updatedAt: new Date().getTime()
    }
  }

  refreshGraph() {
    window.setTimeout(() => {
      this.setState({
        updatedAt: new Date().getTime()
      })
    }, 500)
  }

  render() {
    const { graph, createPixel, deletePixel, username } = this.props
    return (
      <Cell>
        {' '}
        <CellImage
          style={{
            backgroundImage: `url(https://pixe.la/v1/users/${username}/graphs/${graph.id}?t=${
              this.state.updatedAt
            })`
          }}
        />
        <CellBody>
          <div>
            {graph.name}
            {/* <button onClick={() => deleteGraph(graph.id)}>x</button> */}
          </div>
          <button
            onClick={() => {
              createPixel(graph.id)
              this.refreshGraph()
            }}
          >
            Commit!
          </button>
          <button
            onClick={() => {
              deletePixel(graph.id)
              this.refreshGraph()
            }}
          >
            Delete Commit!
          </button>
        </CellBody>
      </Cell>
    )
  }
}

const Cell = styled.div`
  width: calc(48% - 2px);
  margin: 0 1%;
  border: 1px solid #eee;
  float: left;
  background: white;
`

const CellImage = styled.div`
  height: auto;
  position: relative;
  background-position: right;
  background-repeat: no-repeat;
  background-size: 390vw;
  background-position-x: 91.4%;
  background-position-y: 37%;
  &:after {
    content: ' ';
    position: relative;
    display: block;
    padding-bottom: 100%;
  }
`

const CellBody = styled.div`
  padding: 8px;
`
export default GraphCell
