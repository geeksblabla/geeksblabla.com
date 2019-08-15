import React from 'react';
import Button from './Button';
import Modal from 'react-modal';
import { css } from 'emotion';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 450px;
  height: 375px;
  margin: 0 auto;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  position: absolute;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 30px;
  background-color: #000;

  &:focus {
    outline: none;
  }
`;

export default function CalendarModal({
  children,
  isOpen,
  onRequestClose,
}) {
  return (
    <Modal
      className={containerStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
    >
      <h2>Add to Calendar</h2>
      <div>{children}</div>
      <Button onClick={onRequestClose}>Cancel</Button>
    </Modal>
  );
}