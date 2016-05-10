import React, {
  PropTypes as T,
} from 'react';

const styles = {
  wrapper: {
    flex: 1,
    paddingLeft: 16,
  },
  title: {
    fontSize: 13,
  },
};

function SongMeta(props) {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>{props.title}</h2>
    </div>
  );
}

SongMeta.propTypes = {
  title: T.string,
};

export default SongMeta;
