import Head from 'next/head'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Virtuoso } from 'react-virtuoso'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>Logger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <File />
      </main>

      <footer>
      </footer>
    </div>
  )
}

class File extends React.Component {
  constructor (props) {
    super(props)

    this.state = { rows: [] }
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler (event) {
    if (event.target.files.length > 0) {
      const rows = []
      const reader = new FileReader()
      reader.onload = () => {
        const data = reader.result.split('\n')
        for ( let row of data) {
          rows.push( row )
        }
        this.setState({ rows })
      }
      reader.readAsText(event.target.files[0])
    }
  }

  render () {
    return <div>
        <input type='file' onChange={this.changeHandler} />
        <List rows={this.state.rows}/>
      </div>
  }
}

class List extends React.Component {
  render () {
    const rows = this.props.rows
    if (rows.length > 0) {
      return <Virtuoso
        data={rows}
        itemContent={itemContent}
        style={{ height: '600px' }} 
        />
    }
    return ''
  }
}

const itemContent = (index, value) => {
  return <Row index={index} value={value} />
}

class Row extends React.Component {
  constructor (props) {
    super(props)

    this.styles = {
      border: '1px solid #999',
      padding: '5px',
      margin: '5px',
      backgroundColor:'#EEE'
    }
  }

  render () {
    const { index, value } = this.props
    let data
    try {
      data = JSON.parse(value)
    } catch (err) {
      console.log(`value: ${value}`)
      return <div style={this.styles}>error</div>
    }

    const { url, headers, body } = data

    const labelStyles = {
      width: '100px',
      display: 'inline-block',
    }

    return (
      <div style={this.styles}>
        <div>
          <label style={labelStyles}>URL</label>
          <span>{url}</span>
        </div>
        <div>
          <label style={labelStyles}>Topic</label>
          <span>{body.topic}</span>
        </div>
        <div>
          <label style={labelStyles}>Organization</label>
          <span>{body.organization}</span>
        </div>
        <div>
          <label style={labelStyles}>Name</label>
          <span>{body.model_name}</span>
        </div>
        <div>
          <label style={labelStyles}>Type</label>
          <span>{body.model_type} </span>
        </div>
        <div>
          <label style={labelStyles}>Operation</label> 
          <span>{body.operation} </span>
        </div>
        <div>
          <label style={labelStyles}>Username</label> 
          <span>{body.user_name} </span>
        </div>
        <div>
          <label style={labelStyles}>Email</label> 
          <span>{body.user_email} </span>
        </div>
        <div>
          <label style={labelStyles}>Full</label> 
          <span>{JSON.stringify(body)} </span>
        </div>
      </div>
    )
  }
}
