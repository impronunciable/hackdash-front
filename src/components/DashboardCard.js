
import { h } from 'preact'
import { route } from 'preact-router'

const baseUrl = 'https://hackdash.org'

export default ({ dashboard }) =>
  <div style={styles.base} onClick={() => route(`/dashboards/${dashboard.domain}`)}>
    <div style={styles.cover(dashboard.covers[0])}></div>
    <h4 style={styles.title}>{dashboard.title}</h4>
  </div>

const styles = {
  base: {
    width: '100%',
    maxWidth: 300,
    cursor: 'pointer',
    margin: 20,
    background: '#78909C',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  },
  cover(url) {
    return {
      display: 'block',
      height: 300,
      width: 300,
      backgroundSize: 'cover',
      backgroundImage: `url(${baseUrl}${url})`
    }
  },
  title: {
    padding: 10,
    margin: 0,
    color: '#ECEFF1'
  }
}
