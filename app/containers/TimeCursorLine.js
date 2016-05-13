import React, {
  PropTypes as T,
  Component,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import radium from 'radium';
import moment from 'moment';

import * as PlaylistActions from '../actions/Playlist.js';

const styles = {
  wrapper: {
    height: 2,
    width: '100%',
    position: 'relative',
    backgroundColor: '#4a4a4a',
  },
  cursor: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 2,
    backgroundColor: '#08c',
    display: 'block',
  },
  helper: {
    fontSize: 7,
    color: '#a2a2a2',
    position: 'absolute',
    top: -8,
    left: 2,
    letterSpacing: 1,
  },
  totalCursor: {
    left: 'auto',
    right: 2,
  },
};

class TimeCursorLine extends Component {
  componentDidMount() {
    this.intervalToken = setInterval(this.tracking.bind(this), 500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalToken);
  }

  tracking() {
    const {
      player,
      resetTimeCursor,
      updateTimeCursor,
    } = this.props;

    if (player) {
      const now = player.getCurrentTime();
      const total = player.getDuration();

      if (total === 0) {
        resetTimeCursor();
      } else {
        updateTimeCursor(now, total);
      }
    }
  }

  padZero(number) {
    if (number > 9) {
      return number;
    }

    return `0${number}`;
  }

  render() {
    const {
      now,
      total,
    } = this.props;

    const percentageStyle = {
      width: `${now / total * 100}%`,
    };

    const nowDuration = moment.duration(now, 'seconds');
    const nowText = `${this.padZero(nowDuration.minutes())}:${this.padZero(nowDuration.seconds())}`;
    const totalDur = moment.duration(total, 'seconds');
    const totalText = `${this.padZero(totalDur.minutes())}:${this.padZero(totalDur.seconds())}`;

    return (
      <div style={styles.wrapper}>
        <span style={[styles.helper, styles.nowCursor]}>{nowText}</span>
        {total > 0 ? <span style={[styles.cursor, percentageStyle]}></span> : null}
        <span style={[styles.helper, styles.totalCursor]}>{totalText}</span>
      </div>
    );
  }
}

TimeCursorLine.propTypes = {
  now: T.number,
  total: T.number,
  player: T.object,
  resetTimeCursor: T.func,
  updateTimeCursor: T.func,
};

export default connect(
  (state) => ({
    now: state.Playlist.timeCursorNow,
    total: state.Playlist.timeCursorTotal,
    player: state.Playlist.playerInstance,
  }),
  (dispatch) => bindActionCreators(PlaylistActions, dispatch)
)(radium(TimeCursorLine));
