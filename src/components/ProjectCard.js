
import { h } from 'preact'
import { route } from 'preact-router'

const baseUrl = 'https://hackdash.org'

export default ({ project, domain }) =>
  <div style={styles.base} onClick={() => route(`/projects/${project._id}`)}>
    <div style={styles.cover(project.cover)}>
      {!project.cover ?
                      <i style={styles.initial}>{project.title[0]}</i>
                      : null}
    </div>
    <h4 style={styles.title}>{project.title}</h4>
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
      backgroundImage: url && `url(${baseUrl}${url})`,
      backgroundPosition: 'center',
      position: 'relative'
    }
  },
  initial: {
    opacity: .3,
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 250,
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  title: {
    padding: 10,
    margin: 0,
    color: '#ECEFF1'
  }
}
