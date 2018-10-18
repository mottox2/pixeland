import React from 'react'

interface Props {
  onSubmit: (any) => void
}

interface State {
  name: string
  id: string
  unit: string
  type: string
  color: string
}

class GraphForm extends React.Component<Props, State> {
  state = {
    name: '',
    id: '',
    unit: 'commit',
    type: 'int',
    color: 'shibafu'
  }

  onSubmit = e => {
    e.preventDefault()
    const { name, unit, type, color } = this.state
    this.props.onSubmit({
      name,
      id: name,
      unit,
      type,
      color
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
      </form>
    )
  }
}

export default GraphForm
