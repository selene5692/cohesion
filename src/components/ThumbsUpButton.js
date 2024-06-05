import React from 'react';
import { IonIcon } from '@ionic/react'; // Assuming you're using Ionic for the Ionicons
import { thumbsUpOutline } from 'ionicons/icons';

const ThumbsUpButton = ({ count, onPress }) => {
  return (
    <div style={styles.buttonContainer} onClick={onPress}>
      <span style={styles.placeholder}>{count}</span>
      <IonIcon icon={thumbsUpOutline} size={24} color="green" />
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Background color to match the card
    borderRadius: '50%', // Makes the container circular
    padding: '8px', // Padding inside the button
    cursor: 'pointer', // Indicates the div is clickable
  },
  placeholder: {
    marginRight: '8px', // Space between the placeholder and the icon
    fontSize: '14px', // Placeholder text size
  },
};

export default ThumbsUpButton;