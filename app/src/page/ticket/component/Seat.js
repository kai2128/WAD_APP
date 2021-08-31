import React, {useEffect, useState} from 'react';
import {Box} from 'native-base';
import {TouchableWithoutFeedback} from 'react-native';
import {pxSize} from '../../../util/pxSize';

// selected c = #34d399
// available = #fafafa
// unavailable = #9ca3af

export default function (props) {
  const [selected, setSelected] = useState(false);
  const available = Boolean(props.available);
  const [color, setColor] = useState(available ? '#fafafa' : '#9ca3af');
  const id = props.id;

  // update color when selected change
  useEffect(() => {
    if (!available) {
      return;
    }
    if (selected) {
      setColor('#34d399');
    } else {
      // disable user to continute select seat after all ticket is used
      if (props.isDisabled && selected == false) {
        return;
      }
      setColor('#fafafa');
    }
  }, [selected]);

  const seatSelectHandler = () => {
    if (!available) {
      return;
    }
    // disable user to continute select seat after all ticket is used
    if (props.isDisabled && selected == false) {
      return;
    }
    setSelected(!selected);
    // parent callback
    props.onPress(id);
  };

  return (
    <TouchableWithoutFeedback onPress={seatSelectHandler}>
      <Box
        mx={1}
        seatId={id}
        bgColor={color}
        w={pxSize(24)}
        h={pxSize(24)}
        rounded={pxSize(8)}
        borderWidth={pxSize(3)}
        borderColor={'primary.800'}
      />
    </TouchableWithoutFeedback>
  );
}
