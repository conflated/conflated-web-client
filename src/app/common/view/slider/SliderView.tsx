import React from 'react';
import { Slider as ReactCompoundSlider, Handles, Rail, Tracks } from 'react-compound-slider';
import styles from './SliderView.module.scss';

type HandleType = {
  id: any;
  value: number;
  percent: number;
};

type HandleProps = {
  handle: HandleType;
  getHandleProps: any;
};

const Handle = ({ handle: { id, value, percent }, getHandleProps }: HandleProps) => (
  <div
    className={styles.sliderHandle}
    style={{
      left: `${percent}%`
    }}
    {...getHandleProps(id)}
  >
    <div className={styles.handleValue}>{value}</div>
  </div>
);

type TrackProps = {
  source: HandleType;
  target: HandleType;
  getTrackProps: any;
};

const Track = ({ source, target, getTrackProps }: TrackProps) => (
  <div
    className={styles.sliderTrack}
    style={{
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`
    }}
    {...getTrackProps()}
  />
);

type SliderProps = {
  className: string;
  sliderMinValue: number;
  sliderMaxValue: number;
  selectedMinValue?: number;
  selectedMaxValue?: number;
  onSliderValuesChange: (min: number, max: number) => void;
};

export default class SliderView extends React.Component<SliderProps, undefined> {
  onSliderValuesChange = (values: number[]) => {
    const { onSliderValuesChange } = this.props;
    if (values.length === 2) {
      onSliderValuesChange(values[0], values[1]);
    }
  };

  render() {
    const { className, sliderMinValue, sliderMaxValue } = this.props;
    let { selectedMinValue, selectedMaxValue } = this.props;

    if (selectedMinValue == null) {
      selectedMinValue = sliderMinValue;
    }

    if (selectedMaxValue == null) {
      selectedMaxValue = sliderMaxValue;
    }

    return (
      <ReactCompoundSlider
        className={className}
        rootStyle={{
          position: 'relative',
          height: '45px',
          marginLeft: '10px',
          marginRight: '10px',
          flexBasis: 'calc(100% - 20px)'
        }}
        domain={[sliderMinValue, sliderMaxValue]}
        step={1}
        mode={2}
        values={[selectedMinValue, selectedMaxValue]}
        onUpdate={this.onSliderValuesChange as any}
      >
        <Rail>{({ getRailProps }: any) => <div className={styles.sliderRail} {...getRailProps()} />}</Rail>
        <Handles>
          {({ handles, getHandleProps }: any) => (
            <div className="slider-handles">
              {handles.map((handle: HandleType) => (
                <Handle key={handle.id} handle={handle} getHandleProps={getHandleProps} />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }: any) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }: any) => (
                <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
              ))}
            </div>
          )}
        </Tracks>
      </ReactCompoundSlider>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
SliderView.defaultProps = {
  selectedMinValue: null,
  selectedMaxValue: null
};
