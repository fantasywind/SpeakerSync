import React, {
  PropTypes as T,
} from 'react';
import radium from 'radium';
import YouTubePlayer from '../containers/Player/YouTubePlayer.js';

const styles = {

};

function AppBox(props) {
  return (
    <div style={styles.wrapper}>
      {props.children}
      <YouTubePlayer />
    </div>
  );
}

AppBox.propTypes = {
  children: T.node,
};

export default radium(AppBox);
